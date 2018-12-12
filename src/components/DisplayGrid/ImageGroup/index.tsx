import * as React from "react";
import ImageDataBlock from './ImageDataBlock';
import { IFlickrPhoto, IImageData } from "../../../types";
import "./image-group.sass";



const ImageGroup = ({ image }: { image: IFlickrPhoto }) => {
  const {
    id,
    realname,
    username,
    taken,
    owner,
    secret,
    server,
    farm,
    title,
    tags
  } = image;
  const thumbSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg`;
  const photoHref = `https://www.flickr.com/photos/${owner}/${id}`;
  const profileHref = `https://www.flickr.com/people/${owner}`;
  const data: IImageData = {
    realname,
    username,
    title,
    taken,
    tags,
    photoHref,
    profileHref
  };

  return (
    <div className="image-group">
      <a target="_blank" className="image-group__anchor" href={photoHref}>
        <img className="image-group__image" src={thumbSrc} />
      </a>
      <ImageDataBlock imageData={data} />
    </div>
  );
};

export default ImageGroup;
