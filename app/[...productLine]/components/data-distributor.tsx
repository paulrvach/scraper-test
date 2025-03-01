import { ContentBlock } from "@/app/api/test-scraper/route";
import React from "react";
import MainSection from "./main-section";
import ListComponent from "./list-component";
import RowComponent from "./row-component";
import H3 from "./h3";
import ImageWithText from "./image-with-text";
import ImageGallery from "./image-gallery";
import SingleImage from "./single-image";

export type PropsDataDistributor = {
  data: ContentBlock;
};

const DataDistributor = ({ data }: PropsDataDistributor) => {
  if (data.headings?.h1 || (data.headings?.h3 && data.items)) {
    return <MainSection data={data} />;
  } else if (data.headings?.p) {
    return <ListComponent data={data} />;
  } else if (data.headings?.h3 && data.images && data.items) {
    return <RowComponent data={data} />;
  } else if (data.headings?.h3 && data.images == null || data.text) {
    return <H3 data={data} />;
  } else if (
    (data.headings?.h4 && data.images?.length === 1) ||
    (data.images?.length == 1 && data.text)
  ) {
    return <ImageWithText data={data} />;
  } else if (data.images?.length > 1) {
    return <ImageGallery data={data} />;
  } else if (data.images?.length === 1) {
    return <SingleImage data={data} />;
  }
};

export default DataDistributor;
