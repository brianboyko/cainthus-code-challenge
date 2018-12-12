import * as React from "react";
import { IFlickrPhoto } from "../../../types";

const ImageGroup = ({ image }: { image: IFlickrPhoto }) => {
  const { id, owner, secret, server, farm, title } = image;

  const thumbSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
  const photoHref = `https://www.flickr.com/photos/${owner}/${id}`;

  return (
    <div>
      <a href={photoHref}>
        <img src={thumbSrc} />
        <div>{title}</div>
      </a>
    </div>
  );
};

export default ImageGroup;
