import * as superagent from "superagent";
import { IApiValues, IFlickrResponse } from "../types";

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

  public getPhotos(
    searchTerm: string,
    searchType: string,
    pageNumber: number = 1
  ): Promise<IFlickrResponse> {
    const { ajax, url, key } = this;
    const PER_PAGE = 20;
    const query: any = {
      method: "flickr.photos.search",
      api_key: key,
      per_page: PER_PAGE,
      page: pageNumber,
      format: "json",
      nojsoncallback: 1,
      [searchType]: searchTerm
    };

    return new Promise((resolve, reject) =>
      ajax
        .get(url)
        .query(query)
        .then((jsonResponse: superagent.Response) => {
          const { page, perpage, pages, photo } = jsonResponse.body.photos;
          console.log(jsonResponse.body)
          resolve({
            searchType,
            searchTerm,
            pageNumber: page,
            perPage: perpage,
            pages,
            photo,
            stat: jsonResponse.body.stat,
            getNextPage: () =>
              page < pages
                ? this.getPhotos(searchTerm, searchType, pageNumber + 1)
                : () => Promise.resolve(null)
          } as IFlickrResponse);
        })
        .catch((err: any) => {
          console.warn("Error in Api.getPhotos():", err);
          reject(err);
        })
    );
  }
}

export default Api;
