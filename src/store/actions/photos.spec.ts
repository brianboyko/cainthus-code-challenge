import * as photoActions from "./photos";
import actionTypes from "../reduxTypes";
import { fakeFlickrPack } from "../../ajax/__mocks__/api";
jest.mock("../../ajax/api");
const fakeDispatch = jest.fn(() => null);

const initialPhotosState: any = {
  searchType: "tags",
  searchTerm: null,
  photo: [],
  pageNumber: null,
  perPage: 20,
  pages: null
};

describe("./src/store/actions/photos.ts", () => {
  describe("setLoading", () => {
    it('changes the loading setting', () => {
      expect(photoActions.setLoading(true)).toEqual({
        type: actionTypes.photos.SET_LOADING,
        payload: true
      })
      expect(photoActions.setLoading(false)).toEqual({
        type: actionTypes.photos.SET_LOADING,
        payload: false
      })
    })
  })
  describe("loadPhotosIntoStore", () => {
    it("loads a flickrPack as the payload", () => {
      expect(photoActions.loadPhotosIntoStore(fakeFlickrPack)).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack }
      });
    });
  });
  describe("getPhotos", () => {
    it("gets photos", async () => {
      await photoActions.getPhotos("whatever", "tags")(
        fakeDispatch, () => initialPhotosState
      );
      expect(fakeDispatch.mock.calls[0][0]).toEqual({
        type: actionTypes.photos.SET_LOADING,
        payload: true
      })
      expect(fakeDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack }
      });
    });
  });
});
