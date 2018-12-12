import * as superagent from "superagent";
import { IApiValues, IFlickrPack, IFlickrPhoto } from "../types";

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

  public processPack = async (photoPack: IFlickrPack) => {
    const photos: IFlickrPhoto[] = photoPack.photo;
    const processedPhotos = await Promise.all(
      photos.map(async (photo: IFlickrPhoto) => {
        const info = await this.getInfoForPhoto(photo);
        return {
          ...photo,
          ...info,
          profileUrl: `https://www.flickr.com/people/${photo.owner}/`,
          photoUrl: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`
        };
      })
    );
    return { ...photoPack, photo: processedPhotos };
  };

  public getInfoForPhoto = async (photoData: IFlickrPhoto) => {
    const { ajax, url } = this;
    const query: any = this.makeQuery({
      method: "flickr.photos.getInfo",
      photo_id: photoData.id,
      secret: photoData.secret
    });
    return await ajax
      .get(url)
      .query(query)
      .then((jsonResponse: superagent.Response) => {
        const { photo } = jsonResponse.body;
        const { taken } = photo.dates;
        const description = photo.description._content;
        const tags = photo.tags.tag.map((tag: any) => tag._content);
        const { username, realname } = photo.owner;
        return {
          taken,
          description,
          tags,
          username,
          realname
        };
      })
      .catch((err: superagent.ResponseError) => {
        console.error(err);
      });
  };

  public getPhotos = async (
    searchTerm: string,
    searchType: string,
    pageNumber: number = 1
  ): Promise<any> => {
    const { ajax, url } = this;
    const PER_PAGE = 20;
    const query: any = this.makeQuery({
      method: "flickr.photos.search",
      per_page: PER_PAGE,
      page: pageNumber,
      [searchType]: searchTerm
    });
    return ajax
      .get(url)
      .query(query)
      .then((jsonResponse: superagent.Response) => {
        const { page, perpage, pages, photo } = jsonResponse.body.photos;
        return {
          searchType,
          searchTerm,
          pageNumber: page,
          perPage: perpage,
          pages,
          photo,
          stat: jsonResponse.body.stat
        };
      })
      .catch((err: superagent.ResponseError) => {
        console.error("Error in Api.getPhotos: ", err);
      });
  };

  public getAndProcessPhotos = async (
    searchTerm: string,
    searchType: string,
    pageNumber: number = 1
  ) => {
    const output = await this.getPhotos(searchTerm, searchType, pageNumber)
      .then((flickrPack: IFlickrPack) => this.processPack(flickrPack))
      .catch((err: any) => {
        console.error(err);
      });
    return output;
  };

  private makeQuery = (rest: any) => ({
    api_key: this.key,
    format: "json",
    nojsoncallback: 1,
    ...rest
  });
}

export default Api;
