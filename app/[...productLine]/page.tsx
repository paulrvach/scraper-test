"use client";
import React from "react";
import { useData } from "../context/scraped-data-context";
import DataDistributor from "./components/data-distributor";
import { ContentBlock } from "../api/test-scraper/route";


const ProductLinePage: React.FC = () => {
  const { data } = useData();
  return (
    <div className="  flex flex-col mx-auto mt-8 max-w-screen-xl rounded-2xl  p-6 lg:p-16 ">
      {data?.data?.map((properties: ContentBlock, index: number) => {
        return <DataDistributor key={`comp-${index}`} data={properties} />;
      })}
    </div>
  );
};

export default ProductLinePage;
