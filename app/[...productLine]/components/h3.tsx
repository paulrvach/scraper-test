import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const H3 = ({ data: { headings, text } }: PropsDataDistributor) => {
  return (
    <AnimatedShinyText className="mx-0 my-2 text-xl font-bold  text-left  transition ease-out hover:text-neutral-800 hover:duration-300 hover:dark:text-neutral-600">
      <span className="text-left">{headings?.h3 || text}</span>
    </AnimatedShinyText>
  );
};

export default H3;
