import { IFlickrPhoto, IReduxAction } from "../../types";
import actionTypes from "../reduxTypes";

interface IStoredResult {
  lastPageRetrieved: number;
  perPage: 20;
  pages: 9127;
  photos: IFlickrPhoto[];
}

interface IPhotosState {
  byTags: { [key: string]: IStoredResult };
  byText: { [key: string]: IStoredResult };
}

const initialState = { byTags: {}, byText: {} }

/* This code doesn't scan well, but check photos.spec.js for 
   the use case. */
export const photos = (
  state: IPhotosState = initialState,
  action: IReduxAction = { type: "" }
): IPhotosState => {
  switch (action.type) {
    case actionTypes.photos.LOAD_PHOTOS:
      const by: string =
        action.payload.searchType === "tags" ? "byTags" : "byText";
      const { searchTerm, pageNumber, perPage, pages, photo } = action.payload;
      if (!state[by][searchTerm]) {
        return {
          ...state,
          [by]: {
            ...state[by],
            [searchTerm]: {
              lastPageRetrieved: pageNumber,
              perPage,
              pages,
              photos: photo
            }
          }
        };
      }
      return {
        ...state,
        [by]: {
          ...state[by],
          [searchTerm]: {
            ...state[by][searchTerm],
            lastPageRetrieved: pageNumber,
            photos: state[by][searchTerm].photos.concat(photo)
          }
        }
      };

    default:
      return state;
  }
};
