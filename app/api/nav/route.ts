import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export interface NavItem {
  text: string;
  href: string;
}

export interface NavFolder {
  folder: string;
  items: NavItem[];
}

type NavData = (NavItem | NavFolder)[];

export async function GET() {
  const url = "https://www.iristechnology.com";
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const navData: NavData = [];

    // Selector for navigation links - adjust this based on the website's actual structure
    $(".header-nav-list > div.header-nav-item").each((_, navItemElement) => {
      const $navItem = $(navItemElement);

      if ($navItem.hasClass("header-nav-item--folder")) {
        // Handle folder items (dropdowns)
        const folderTitleElement = $navItem.find("a.header-nav-folder-title");
        const folderName = folderTitleElement.text().trim();

        const folderItems: NavItem[] = [];
        $navItem
          .find(".header-nav-folder-content .header-nav-folder-item a")
          .each((_, itemElement) => {
            const text =
              $(itemElement)
                .find(".header-nav-folder-item-content")
                .text()
                .trim() || $(itemElement).text().trim(); // Use text within span if available, otherwise use direct text
            const href = $(itemElement).attr("href") || "";
            if (text && href) {
              folderItems.push({ text, href });
            }
          });

        navData.push({ folder: folderName, items: folderItems });
      } else if ($navItem.hasClass("header-nav-item--collection")) {
        // Handle collection items (single links)
        const linkElement = $navItem.find("a");
        const text = linkElement.text().trim();
        const href = linkElement.attr("href") || "";
        if (text && href) {
          navData.push({ text, href });
        }
      }
    });

    return NextResponse.json(
      {
        data: navData.slice(0, 4),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch navigation data",
      },
      { status: 500 }
    );
  }
}
