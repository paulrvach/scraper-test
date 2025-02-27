import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const RowComponent = ({
  data: { headings, src, images, items },
}: PropsDataDistributor) => {
  return (
    <section className="py-32 ">
      <div className=" grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col  gap-4 ">
            <Badge variant="outline" className="w-fit bg-background">
              {"Power"}
            </Badge>
            <h3 className="text-3xl font-semibold lg:text-5xl">
              {headings?.h3}
            </h3>
            {items?.map((item) => (
              <p className="text-muted-foreground lg:text-lg" key={item.text}>
                {item.text}
              </p>
            ))}
          </div>

        </div>
          <Image
            src={images[0].src!}
            alt={images[0].text!}
            width={1080}
            height={1080}
            className="rounded-xl"
          />
      </div>
    </section>
  );
};

export default RowComponent;
