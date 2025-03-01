import React from "react";
import { PropsDataDistributor } from "./data-distributor";
import Image from "next/image";
const SingleImage = ({ data: { images } }: PropsDataDistributor) => {
  return (
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
  );
};

export default SingleImage;
