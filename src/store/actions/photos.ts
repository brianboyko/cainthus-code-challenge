import actionTypes from "../reduxTypes";
import Api from "../../ajax/api";
import { IFlickrPack } from "../../types";
import { Dispatch } from "redux";

const api = new Api();

export const setLoading = (bool: boolean) => ({
  type: actionTypes.photos.SET_LOADING,
  payload: bool
});

export const loadPhotosIntoStore = (photoPack: IFlickrPack) => ({
  type: actionTypes.photos.LOAD_PHOTOS,
  payload: photoPack
});

export const getPhotos = (searchTerm: string, searchType: string = "tags") => (
  dispatch: Dispatch,
  getState: any
) =>
  new Promise((resolve, reject) => {
    dispatch(setLoading(true));
    const state = getState();
    const isAtEnd: boolean = state.pages === state.pageNumber;
    if (isAtEnd) {
      resolve();
    }
    const nextPageNumber: number =
      searchTerm !== state.searchTerm || searchType !== state.searchType
        ? 1
        : state.pageNumber + 1;
    return api
      .getPhotos(searchTerm, searchType, nextPageNumber)
      .then((photoPack: IFlickrPack) => {
        return dispatch(loadPhotosIntoStore(photoPack));
      })
      .then(resolve)
      .catch(err => {
        console.error("Error in actions.getPhotos():", err);
        reject(err);
      });
  });
