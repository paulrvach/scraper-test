import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

type NavHeaders = {
  name: string;
  href: string | undefined;
  classes: string | undefined;
}[];

const navItems = new Set([
  "Man Portable",
  "Radio Power Adapters",
  "Tactical Power Managers",
  "Man Portable Power System",
  "FOBLite 360",
  "Iris Fuel Cell Series",
  "Hybrid Power Systems",
  "Modular Advanced Hybrid Power Systems (MAHPS)",
  "Solar Component Power",
  "US Army AWG Project Silent Watch",
  "Radio Power Adapters",
  "Merlin-Handheld Radio Power Adapter",
  "Merlin-Handheld & Sidemate Radio Power Adapter",
  "Merlin-Handheld TrellisWare TW-950 Radio Power Adapter",
  "Merlin-3 Radio Power Adapter",
  "Merlin-2 Radio Power Adapter",
  "Power Generation",
  "Iris 3000 Fuel Cell",
  "Solar Panels",
  "Vehicle Mounted",
  "QP-1800 Complete Inverter System",
  "Tactical Lighting",
  "FOBLite 360",
  "FOBLite Max 360",
  "FOBLite HQ",
]);

export async function GET() {
  const url = "https://www.iristechnology.com/careers";
  const { data: html } = await axios.get(url);
  const webPage = cheerio.load(html);

  const navHeaders: NavHeaders = [];

  webPage("a").each((index, element) => {
    const href = webPage(element).attr("href");
    const classes = webPage(element).find("span").attr("class");
    const textContent = webPage(element).text().trim();

    if (textContent.length !== 0) {
      if (
        !navHeaders.some(
          (item) => item.name === textContent && item.href === href
        )
      ) {
        navHeaders.push({ name: textContent, href, classes });
        if (navItems.has(textContent)) {
          navItems.delete(textContent);
        }
      }
    }
  });
  return NextResponse.json({
    data: navHeaders,
  });
}
