import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const ImageWithText = ({
  data: { headings, src, images, items, text },
}: PropsDataDistributor) => {
  return (
    <div className="contents">
      <Card className="">
        <CardHeader className="flex shrink">
          <CardTitle>{headings?.h4! || text}</CardTitle>
        </CardHeader>
        <CardContent className="w-sm">
          {images ? (
            <Image
              src={images[0].src!}
              alt={images[0].text!}
              width={100}
              height={100}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageWithText;
