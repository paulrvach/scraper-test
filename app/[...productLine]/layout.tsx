import React from "react";
import { URL } from "@/lib/utils";
import { DataProvider } from "../context/scraped-data-context";
import { LayoutProps } from "@/.next/types/app/layout";

type Props = {
  params: { productLine: string[] };
  children: React.ReactNode;
} & LayoutProps

export default async function Layout({ params, children }: Props) {
  const { productLine } = params;
  const url = `${URL}${productLine.join("/")}`;
  return <DataProvider url={url}>{children}</DataProvider>;
}
