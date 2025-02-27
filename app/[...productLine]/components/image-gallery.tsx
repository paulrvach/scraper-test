import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageSwiper } from "@/components/ui/image-swiper";
const ImageGallery = ({
  data: { headings, src, images, items, text },
}: PropsDataDistributor) => {
  return (
    <Card className="max-w-[400px]">
      <CardContent className="p-0">
        <ImageSwiper images={images} />
      </CardContent>
        
    </Card>
  );
};

export default ImageGallery;
