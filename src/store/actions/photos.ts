import actionTypes from "../reduxTypes";
import Api from "../../ajax/api";
import {  IFlickrPack } from "../../types";
import { Dispatch } from "redux";

const api = new Api();

/**
 * Thes actions might require some explaination to show you what they're doing.
 * loadPhotosIntoStore is just our base synchronous action. This is where the
 * LOAD_PHOTOS action actually finally gets created and sent out.
 *
 * getNextPhotos is a bit more difficult to explain.  It will take as it's one
 * parameter a function which will return a promise from api.getPhotos. We then call
 * the "then" method on it to get our photoPack and load the files into the store.
 * In the end, we return the result of the promise then chain, which would be another
 * reference to flickrResponse.getNextPage - a callback which automatically queues
 * up the next photos when we want to recieve them.
 *
 * To kick it all off, we have a "getInitialPhotos" method which will put the initial API call
 * into getNextPhotos, starting the chain.
 *
 */

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
) => {
  dispatch(setLoading(true));
  const state = getState();
  const isAtEnd: boolean = state.pages === state.pageNumber;
  if (isAtEnd) {
    return null;
  }
  const nextPageNumber: number =
    searchTerm !== state.searchTerm || searchType !== state.searchType
      ? 1
      : state.pageNumber + 1;
  return api
    .getPhotos(searchTerm, searchType, nextPageNumber)
    .then((photoPack: IFlickrPack) => {
      return dispatch(loadPhotosIntoStore(photoPack));
    });
};
