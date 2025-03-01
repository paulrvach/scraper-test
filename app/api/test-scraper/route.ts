import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
interface TableRow {
  [key: string]: string;
}

export interface ContentBlock {
  type?: string;
  headings?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string[];
    p?: string;
  };
  text?: string;
  items?: { src?: string; text: string | undefined }[];
  src?: string;
  iframe?: string;
  tables?: TableRow[][];
  images?: { src?: string; text: string | undefined }[];
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  const url = res.url;
  const scrapedContent = await scrapePageContent(url);
  return NextResponse.json({
    data: scrapedContent,
  });
}

async function scrapePageContent(url: string): Promise<ContentBlock[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const contentBlocks: ContentBlock[] = [];

    $(".content").each((_, element) => {
      const section = $(element);

      const block = section.find(".fe-block");
      const row = section.find(".row");

      if (block.length > 0) {
        block.each((index, element) => {
          const $element = $(element);
          const parsedContentBlock = parseElement($element, $);
          contentBlocks.push(parsedContentBlock);
        });
        // Merge text-image blocks:
        for (let i = 0; i < contentBlocks.length - 1; i++) {
          const currentBlock = contentBlocks[i];
          const nextBlock = contentBlocks[i + 1];

          if (
            currentBlock.images?.length == 1 &&
            nextBlock.text &&
            Object.keys(nextBlock).length === 1 &&
            Object.keys(currentBlock).length === 1
          ) {
            // Only 'images' property
            contentBlocks[i] = {
              text: nextBlock.text,
              images: currentBlock.images,
            };
            contentBlocks.splice(i + 1, 1); // Remove the next block
            i--; // Decrement i to re-examine current index after removal
          }
        }
        const concatedImageAndTextBlocks = [];
        for (let i = 0; i < contentBlocks.length - 1; i++) {
          const currentBlock = contentBlocks[i];

          if (
            currentBlock.text &&
            currentBlock.images &&
            Object.keys(currentBlock).length === 2
          ) {
            concatedImageAndTextBlocks.push({
              src: currentBlock.images[0].src,
              text: currentBlock.text,
            });
            contentBlocks.splice(i, 1);
            i--;
          }
        }

        if (concatedImageAndTextBlocks.length > 0)
          contentBlocks.push({ images: concatedImageAndTextBlocks });

        console.log(contentBlocks);
      }
      if (row.length > 0) {
        row.each((index, element) => {
          const cols = $(element).find(".col");
          cols.each((index, col) => {
            const $col = $(col);
            const parsedContentBlock = parseElement($col, $);
            contentBlocks.push(parsedContentBlock);
          });
        });
      }
    });

    // Deduplication step:
    const uniqueContentBlocks: ContentBlock[] = [];
    const seenContentBlockStrings = new Set<string>();

    for (const block of contentBlocks) {
      const blockString = JSON.stringify(block);
      if (!seenContentBlockStrings.has(blockString)) {
        uniqueContentBlocks.push(block);
        seenContentBlockStrings.add(blockString);
      }
    }

    return uniqueContentBlocks;
  } catch (error) {
    console.error("Error scraping page:", error);
    return [];
  }
}

function parseElement(
  element: cheerio.Cheerio,
  $: cheerio.Root
): ContentBlock {
  const contentBlock: ContentBlock = {};
  const list = element.find("li");
  const h1 = removeSpace(element.find("h1").text());
  const h2 = removeSpace(element.find("h2").text());
  const h3 = removeSpace(element.find("h3").text());
  const p =
    element.find("p").length == 1
      ? removeSpace(element.find("p").text())
      : null;
  const h4 = element.find("h4");
  const img = element.find("img");
  const iFrame = element.find(".sqs-video-wrapper").attr("data-html");
  const table = element.find("table");
  if (list.length > 0) {
    const heading =
      $(element.find("h3")).first().text().replace(/\s\s+/g, "") ||
      $(element.find("p")).first().text().replace(/\s\s+/g, "");
    contentBlock.headings = { p: heading };
    contentBlock.items = [];
    list.each((index, listItem) => {
      const listItemText = removeSpace($(listItem).text());
      const listItemSrc = $(listItem).find("a").attr("src");
      contentBlock.items?.push({ text: listItemText, src: listItemSrc });
    });
  }

  if (h4.length > 0) {
    contentBlock.headings = { h4: [] };
    h4.each((index, title) => {
      const text = removeSpace($(title).text());
      contentBlock.headings?.h4?.push(text);
    });
  }

  if (h1 || h2 || h3) {
    contentBlock.items = [];
    contentBlock.headings = {};
    if (h1) contentBlock.headings.h1 = h1;
    if (h2) contentBlock.headings.h2 = h2;
    if (h3) contentBlock.headings.h3 = h3;
    if (removeSpace(h4.text()))
      contentBlock.headings.h1 = removeSpace(h4.text());
    element.find("p").each((index, item) => {
      const text = removeSpace($(item).text());
      contentBlock.items?.push({ text: text });
    });
  }

  if (img.length > 0) {
    contentBlock.images = [];
    img.each((index, image) => {
      const src = $(image).attr("data-src") || $(image).attr("data-src");
      const alt = $(image).attr("alt");
      contentBlock.images?.push({ src, text: alt });
    });
  }
  if (iFrame) {
    const $iframe = cheerio.load(iFrame);
    const iframeSrc = $iframe("iframe").attr("src");
    contentBlock.iframe = iframeSrc;
  }
  if (table.length > 0) {
    const tables: TableRow[][] = scrapeTables(table, $);
    contentBlock.tables = tables;
  }

  if (p) contentBlock.text = p;

  return contentBlock;
}

function removeSpace(string: string): string {
  return string.replace(/\s\s+/g, "");
}

function scrapeTables(
  table: cheerio.Cheerio,
  $: cheerio.Root
): TableRow[][] {
  const tables: TableRow[][] = [];

  const headers: string[] = [];
  const rows: TableRow[] = []; // Extract table headers

  $(table)
    .find("tr.header-row th")
    .each((_, th) => {
      headers.push($(th).text().trim());
    }); // Add headers as the first row

  const headerRow: TableRow = {};
  headers.forEach((header) => {
    headerRow[header] = header; // Header keys and values match
  });
  rows.push(headerRow); // Extract table rows

  $(table)
    .find("tbody tr")
    .each((_, tr) => {
      if ($(tr).hasClass("header-row")) return; // Skip the header row in tbody

      const row: TableRow = {};
      $(tr)
        .find("td")
        .each((colIndex, td) => {
          const key = headers[colIndex] || `Column${colIndex + 1}`;
          row[key] = $(td).text().trim().replace(/\s+/g, " "); // Remove excessive whitespace
        });

      if (Object.keys(row).length > 0) rows.push(row);
    });

  tables.push(rows);

  return tables;
}
