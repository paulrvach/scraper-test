import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ListComponent = ({
  data: { headings, src, images, items },
}: PropsDataDistributor) => {
  console.log(headings)

  const uniqueItems = items
    ? [...new Set(items.map((item) => item.text))]
    : null;
  return (
    <div>
      <div className="max-w-md">
        {images ? (
          <Image
            src={images[0].src!}
            alt={images[0].text!}
            width={1080}
            height={1080}
          />
        ) : null}
      </div>
      <AnimatedShinyText className="text-xl font-bold inline-flex items-center justify-center  transition ease-out hover:text-neutral-800 hover:duration-300 hover:dark:text-neutral-600">
        <span>{headings?.p}</span>
      </AnimatedShinyText>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        {uniqueItems?.map((item) => (
          <li className="my-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
