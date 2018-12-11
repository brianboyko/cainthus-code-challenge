import * as photoActions from "../actions/photos";
jest.mock("../../ajax/api");
import { photos } from "./photos";

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
        byTags: {},
        byText: {}
      });
      const first = photos(
        base,
        photoActions.loadPhotosIntoStore({ ...fakeFlickrPack })
      );
      expect(first).toEqual({
        byTags: {
          puppies: {
            lastPageRetrieved: 1,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2]
          }
        },
        byText: {}
      });
      const second = photos(
        first,
        photoActions.loadPhotosIntoStore({ ...fakeFlickrPack, pageNumber: 2 })
      );
      expect(second).toEqual({
        byTags: {
          puppies: {
            lastPageRetrieved: 2,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2, fakePhoto, fakePhoto2]
          }
        },
        byText: {}
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
        byTags: {
          puppies: {
            lastPageRetrieved: 2,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2, fakePhoto, fakePhoto2]
          },
          kitties: {
            lastPageRetrieved: 1,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2]
          }
        },
        byText: {}
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
      expect(third).toEqual({
        byTags: {
          puppies: {
            lastPageRetrieved: 2,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2, fakePhoto, fakePhoto2]
          },
          kitties: {
            lastPageRetrieved: 1,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2]
          }
        },
        byText: {}
      });
      expect(fourth).toEqual({
        byTags: {
          puppies: {
            lastPageRetrieved: 2,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2, fakePhoto, fakePhoto2]
          },
          kitties: {
            lastPageRetrieved: 1,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2]
          }
        },
        byText: {
          "cute goats": {
            lastPageRetrieved: 1,
            perPage: 20,
            pages: 9127,
            photos: [fakePhoto, fakePhoto2]
          }
        }
      });
    });
  });
});
