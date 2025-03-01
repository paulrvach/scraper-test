import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImageSwiper } from "@/components/ui/image-swiper";
const ImageGallery = ({
  data: { images, text },
}: PropsDataDistributor) => {
  return (
    <Card className="max-w-[400px]">
      <CardContent className="p-0">
        <ImageSwiper images={images} />
      </CardContent>
      {text && <CardHeader>{text}</CardHeader>}
    </Card>
  );
};

export default ImageGallery;
