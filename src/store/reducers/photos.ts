import { IReduxAction, IPhotosState } from "../../types";
import actionTypes from "../reduxTypes";

const initialPhotosState: IPhotosState = {
  searchType: "tags",
  searchTerm: null,
  photo: [],
  pageNumber: null,
  perPage: 20,
  pages: null
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
      if (pageNumber === 1) {
        return {
          searchType,
          searchTerm,
          pageNumber,
          perPage,
          pages,
          photo
        };
      }
      return {
        ...state,
        photo: state.photo.concat(photo)
      };

    default:
      return state;
  }
};

export const loading = (
  state: boolean = false,
  action: IReduxAction = { type: "" }
) => {
  switch (action.type) {
    case actionTypes.photos.SET_LOADING:
      return action.payload;
    case actionTypes.photos.LOAD_PHOTOS:
      return false;
    default:
      return state;
  }
};
