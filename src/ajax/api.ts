import * as superagent from "superagent";

interface IApiValues {
  url: string;
  key: string;
}

const defaultApiValues: IApiValues = {
  url: process.env.REACT_APP_FLICKR_API_URL as string,
  key: process.env.REACT_APP_FLICKR_API_KEY as string
};

class Api {
  private url: string;
  private key: string;
  constructor(
    { url, key }: IApiValues = defaultApiValues,
    private ajax = superagent // useful if we ever need to mock the entire superagent library
  ) {
    this.url = url;
    this.key = key;
  }
  public getPhotosBySearch = (searchTerm: string, pageNumber: number = 1) => this.getPhotos('text', searchTerm, pageNumber)
  public getPhotosByTags = (searchTerm: string, pageNumber: number = 1) => this.getPhotos('tags', searchTerm, pageNumber)

  private async getPhotos(
    searchType: string,
    searchTerm: string,
    pageNumber: number,
  ): Promise<any> {
    const { ajax, url, key } = this;

    const query: any = {
      method: "flickr.photos.search",
      api_key: key,
      per_page: 20,
      page: pageNumber,
      format: "json",
      nojsoncallback: 1,
      [searchType]: searchTerm,
    };

    return new Promise((resolve, reject) => {
      ajax
        .get(url)
        .query(query)
        .then((jsonResponse: superagent.Response) => {
          resolve({
            searchType,
            searchTerm,
            pageNumber,
            data: jsonResponse.body,
            getNextPage: () => this.getPhotos(searchType, searchTerm, pageNumber + 1)
          });
        })
        .catch((err: any) => {
          console.warn("Error in Api.getPhotos():", err);
          reject(err);
        });
    });
  }
}

export default Api;
