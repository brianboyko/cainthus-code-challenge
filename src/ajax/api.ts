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
  public async getPhotos(
    searchTerm: string,
    pageNumber: number = 1
  ): Promise<any> {
    const { ajax, url, key } = this;

    return new Promise((resolve, reject) => {
      ajax
        .get(url)
        .query({
          method: "flickr.photos.search",
          api_key: key,
          text: searchTerm,
          per_page: 20,
          page: pageNumber,
          format: "json",
          nojsoncallback: 1
        })
        .then((jsonResponse: superagent.Response) => {
          resolve({
            searchTerm,
            pageNumber,
            data: jsonResponse.body,
            getNextPage: () => this.getPhotos(searchTerm, pageNumber + 1)
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
