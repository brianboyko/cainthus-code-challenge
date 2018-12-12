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
    const { photos } = state;
    const isAtEnd: boolean = photos.pages === photos.pageNumber;
    if (isAtEnd) {
      resolve();
    }

    const nextPageNumber: number =
      searchTerm !== photos.searchTerm || searchType !== photos.searchType
        ? 1
        : photos.pageNumber + 1;

    return api
      .getAndProcessPhotos(searchTerm, searchType, nextPageNumber)
      .then((response: any) => {
        return dispatch(loadPhotosIntoStore(response))
      })
      .then(resolve)
      .catch((err: any) => {
        console.error("Error in actions.getPhotos():", err);
        reject(err);
      });
  });
