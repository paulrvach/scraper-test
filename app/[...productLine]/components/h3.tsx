import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const H3 = ({ data: { headings } }: PropsDataDistributor) => {
  return (
    <AnimatedShinyText className="text-xl font-bold inline-flex items-center justify-center  transition ease-out hover:text-neutral-800 hover:duration-300 hover:dark:text-neutral-600">
      <span>{headings?.h3}</span>
    </AnimatedShinyText>
  );
};

export default H3;
