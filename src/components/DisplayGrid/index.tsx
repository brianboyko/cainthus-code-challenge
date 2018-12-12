import * as React from "react";
import ImageGroup from "./ImageGroup";
import * as uuid from "uuid";
import { IFlickrPhoto } from "../../types";
import * as Aphrodite from "aphrodite";
import './display-grid.sass';

const { StyleSheet, css } = Aphrodite;

const dynamicallyCreateGridAtRuntime = (numberOfColumns: number) =>
  StyleSheet.create({
    displayGrid: {
      display: "grid",
      gridTemplateColumns: Array.from(
        { length: numberOfColumns },
        () => "1fr"
      ).join(" "),
      gridTemplateRows: "1fr",
      gridTemplateAreas: Array.from(
        { length: numberOfColumns },
        (_: any, i: number) => `col${i.toString()}`
      ).join(" "),
      gridColumnGap: "10px"
    }
  });

const DisplayGrid = (props: any) => {
  const numberOfColumns: number = props.numberOfColumns || 5;
  const columns: any[][] = Array.from({ length: numberOfColumns }, () => []);
  const styles = dynamicallyCreateGridAtRuntime(numberOfColumns);
  props.photo.forEach((photo: IFlickrPhoto, index: number) => {
    columns[index % numberOfColumns].push(photo);
  });

  return (
    <div className={css(styles.displayGrid)}>
      {columns.map((column: any[], colIndex: number) => (
        <div key={colIndex} className="display-grid__column">
          {column.map((imageData: IFlickrPhoto) => (
            <ImageGroup key={uuid.v4()} image={imageData} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayGrid;
