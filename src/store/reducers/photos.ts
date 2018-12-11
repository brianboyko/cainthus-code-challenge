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

interface ICurrentDisplayState {
  loading: boolean;
  searchType: string;
  searchTerm: string | null;
}

const initialPhotosState: IPhotosState = { byTags: {}, byText: {} };

const initialCurrentDisplayState: ICurrentDisplayState = {
  loading: false,
  searchType: "tags",
  searchTerm: null
};

/* This code doesn't scan well, but check photos.spec.js for 
   the use case. */
export const photos = (
  state: IPhotosState = initialPhotosState,
  action: IReduxAction = { type: "" }
): IPhotosState => {
  switch (action.type) {
    case actionTypes.photos.LOAD_PHOTOS:
      const {
        searchType,
        searchTerm,
        pageNumber,
        perPage,
        pages,
        photo
      } = action.payload;
      const by: string = searchType === "tags" ? "byTags" : "byText";
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

export const currentDisplay = (
  state: ICurrentDisplayState = initialCurrentDisplayState,
  action: IReduxAction = { type: "" }
) => {
  switch (action.type) {
    case actionTypes.photos.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.photos.LOAD_PHOTOS:
      return {
        loading: false,
        searchTerm: action.payload.searchTerm,
        searchType: action.payload.searchType
      };
    default:
      return state;
  }
};
