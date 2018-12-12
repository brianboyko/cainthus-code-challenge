import * as superagent from "superagent";
import { IApiValues, IFlickrPack, IFlickrPhoto } from "../types";

const defaultApiValues: IApiValues = {
  url: process.env.REACT_APP_FLICKR_API_URL as string,
  key: process.env.REACT_APP_FLICKR_API_KEY as string
};

class Api {
  private url: string;
  private key: string;
  private userCache: any = {};
  constructor(
    { url, key }: IApiValues = defaultApiValues,
    private ajax = superagent // useful if we ever need to mock the entire superagent library
  ) {
    this.url = url;
    this.key = key;
  }
  // needs coverage
  public getAllUsersForPack = async (photoPack: IFlickrPack) => {
    const photoData = await Promise.all(
      photoPack.photo.map(async onePhoto => {
        const userData = await this.getUser(onePhoto.owner);
        return { ...onePhoto, userData };
      })
    );
    return { ...photoPack, photo: photoData };
  };
  public getUser = async (userId: string) => {
    if (this.userCache[userId]) {
      return this.userCache[userId];
    }
    const { ajax, url } = this;
    const query: any = this.makeQuery({
      method: "flickr.people.getInfo",
      user_id: userId
    });
    return await ajax
      .get(url)
      .query(query)
      .then((jsonResponse: superagent.Response) => {
        const { username, realname, location } = jsonResponse.body;
        console.log(jsonResponse.body);
        this.userCache[userId] = { username, realname, location };
        return { username, realname, location };
      })
      .catch((err: superagent.ResponseError) => {
        console.error(err);
      });
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
        console.log(jsonResponse);
        return {
          ...photoData,
          tagData: jsonResponse.body.tags,
          taken: jsonResponse.body.taken
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
  private makeQuery = (rest: any) => ({
    api_key: this.key,
    format: "json",
    nojsoncallback: 1,
    ...rest
  });
}

export default Api;
