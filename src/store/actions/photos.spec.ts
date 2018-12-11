import * as photoActions from "./photos";
import actionTypes from "../reduxTypes";
import { fakeFlickrPack } from "../../ajax/__mocks__/api";
jest.mock("../../ajax/api");
const fakeDispatch = jest.fn(() => {});

describe("./src/store/actions/photos.ts", () => {
  describe("loadPhotosIntoStore", () => {
    it("loads a flickrPack as the payload", () => {
      expect(photoActions.loadPhotosIntoStore(fakeFlickrPack)).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack }
      });
    });
  });
  describe("getInitialPhotos/getNextPhotos", () => {
    it("getsInitialPhotos and returns a Promise to pass to getNextPhotos", async () => {
      const first = await photoActions.getInitialPhotos("whatever", "tags")(
        fakeDispatch
      );
      expect(fakeDispatch.mock.calls[0][0]).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack }
      });
      expect(typeof test).toBe("function");
    
      const second = await photoActions.getNextPhotos(first)(fakeDispatch);
      expect(typeof second).toBe("function");
      expect(fakeDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack, pageNumber: 2 }
      });
      const third = await photoActions.getNextPhotos(second)(fakeDispatch);
      expect(typeof third).toBe("function");
      expect(fakeDispatch.mock.calls[2][0]).toEqual({
        type: actionTypes.photos.LOAD_PHOTOS,
        payload: { ...fakeFlickrPack, pageNumber: 3 }
      });
    });
  });
});
