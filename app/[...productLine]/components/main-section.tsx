import React from "react";
import { PropsDataDistributor } from "./data-distributor";

const MainSection = ({
  data: { headings, src, images, items },
}: PropsDataDistributor) => {
  return (
    <div className="text-left text-primary max-w-3xl flex flex-col gap-4 ">
      {headings?.h1 && (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          {headings.h1}
        </h1>
      )}
      {headings?.h2 && (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0  ">
          {headings.h2}
        </h2>
      )}
      {headings?.h3 && (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ">
          {headings.h3}
        </h3>
      )}
      {headings?.h4 && (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
          {headings.h4}
        </h4>
      )}
      {items?.map((item) => {
        return (
          <p className="" key={`p-${item.text}`}>
            {item.text}
          </p>
        );
      })}
    </div>
  );
};

export default MainSection;
