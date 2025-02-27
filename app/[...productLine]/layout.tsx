import React from "react";
import { URL } from "@/lib/utils";
import { DataProvider } from "../context/scraped-data-context";

type Props = {
  params: Promise<{ productLine: string[] }>;
} & React.ComponentProps<"div">;

const Layout = async ({ params, children }: Props) => {
  const { productLine } = await params;
  const url = `${URL}${productLine.join("/")}`;
  return <DataProvider url={url}>{children}</DataProvider>;
};

export default Layout;
