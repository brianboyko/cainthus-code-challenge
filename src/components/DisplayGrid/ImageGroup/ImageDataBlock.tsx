import * as React from "react";
import moment from "moment";

import { IImageData } from "../../../types";

const ImageDataBlock = ({ imageData }: { imageData: IImageData }) => {
  const {
    profileHref,
    photoHref,
    realname,
    username,
    title,
    taken,
    tags
  } = imageData;
  const timestring: string | null = taken
    ? moment(taken, "YYYY-MM-DD hh:mm:ss").format(
        "[Taken] ddd, MMMM Do, YYYY, [at] h:mm A"
      )
    : null;
  return (
    <div className="image-group__data">
      <div className="title">
        <a target="_blank" className="title__link" href={photoHref}>
          {title ? title : "(Untitled)"}
        </a>
      </div>
      <div className="names-and-date">
        {timestring ? <div className="taken-at">{timestring}</div> : null}
        <div className="names">
          {username ? (
            <span className="username">
              <a target="_blank" className="names__link" href={profileHref}>
                {username}
              </a>
            </span>
          ) : null}
          {username && realname ? <span> - </span> : null}
          {realname ? (
            <a target="_blank" className="names__link" href={profileHref}>
              {realname}
            </a>
          ) : null}
        </div>
      </div>
      {tags && tags.length ? (
        <div className="tags">
          {tags.map((tag: string) => (
            <a
              className="tag__link"
              key={tag}
              href={`https://www.flickr.com/photos/tags/${tag}`}
            >
              <div key={tag} className="tag">
                {tag}
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ImageDataBlock;
