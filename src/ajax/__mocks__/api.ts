export const fakeFlickrPack = {
  searchType: "tags",
  searchTerm: "puppies",
  pageNumber: 1,
  perPage: 20,
  pages: 9127,
  photo: [
    {
      id: "45541511224",
      owner: "165634894@N05",
      secret: "6fb95d984a",
      server: "4866",
      farm: 5,
      title: "American Foxhound",
      ispublic: 1,
      isfriend: 0,
      isfamily: 0
    }
  ],
  stat: "ok"
};

class Api {
  public getPhotos = (
    searchTerm: string,
    searchType: string,
  ) => {
    return Promise.resolve(fakeFlickrPack);
  };
}

export default Api;
