import * as photoActions from "../actions/photos";
jest.mock("../../ajax/api");
import { photos, loading } from "./photos";

const fakePhoto = {
  id: "45541511224",
  owner: "165634894@N05",
  secret: "6fb95d984a",
  server: "4866",
  farm: 5,
  title: "American Foxhound",
  ispublic: 1,
  isfriend: 0,
  isfamily: 0
};

const fakePhoto2 = {
  ...fakePhoto,
  id: "whatever"
};
export const fakeFlickrPack = {
  searchType: "tags",
  searchTerm: "puppies",
  pageNumber: 1,
  perPage: 20,
  pages: 9127,
  photo: [fakePhoto, fakePhoto2],
  stat: "ok"
};

describe("./src/store/reducers/photos.ts", () => {
  describe("photos", () => {
    it("stores photo data", () => {
      const base = photos();
      expect(base).toEqual({
        searchType: "tags",
        searchTerm: null,
        photo: [],
        pageNumber: null,
        perPage: 20,
        pages: null
      });
      const first = photos(
        base,
        photoActions.loadPhotosIntoStore(fakeFlickrPack)
      );
      expect(first).toEqual({
        searchType: "tags",
        searchTerm: "puppies",
        photo: [fakePhoto, fakePhoto2],
        pageNumber: 1,
        perPage: 20,
        pages: 9127
      });
      const second = photos(
        first,
        photoActions.loadPhotosIntoStore({ ...fakeFlickrPack, pageNumber: 2 })
      );
      expect(second).toEqual({
        searchType: "tags",
        searchTerm: "puppies",
        photo: [fakePhoto, fakePhoto2, fakePhoto, fakePhoto2],
        pageNumber: 1,
        perPage: 20,
        pages: 9127
      });
      const third = photos(
        second,
        photoActions.loadPhotosIntoStore({
          ...fakeFlickrPack,
          pageNumber: 1,
          searchTerm: "kitties"
        })
      );
      expect(third).toEqual({
        searchType: "tags",
        searchTerm: "kitties",
        photo: [fakePhoto, fakePhoto2],
        pageNumber: 1,
        perPage: 20,
        pages: 9127
      });
      const fourth = photos(
        third,
        photoActions.loadPhotosIntoStore({
          ...fakeFlickrPack,
          pageNumber: 1,
          searchType: "text",
          searchTerm: "cute goats"
        })
      );
      expect(fourth).toEqual({
        searchType: "text",
        searchTerm: "cute goats",
        photo: [fakePhoto, fakePhoto2],
        pageNumber: 1,
        perPage: 20,
        pages: 9127
      });
    });
  });
  describe("loading()", () => {
    it("stores the current search term", () => {
      const base = loading();
      expect(base).toBe(false);
      const first = loading(base, photoActions.setLoading(true));
      expect(first).toBe(true);

      expect(loading(first, photoActions.setLoading(false))).toBe(false);

      expect(
        loading(
          first,
          photoActions.loadPhotosIntoStore({
            ...fakeFlickrPack,
            searchType: "text",
            searchTerm: "baby chicks"
          })
        )
      ).toBe(false);
    });
  });
});
