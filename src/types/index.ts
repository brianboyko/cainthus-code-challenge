export interface IApiValues {
  url: string;
  key: string;
}

export interface IFlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title?: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface IFlickrPack {
  searchType: string;
  searchTerm: string;
  pageNumber: number;
  perPage: number;
  pages: number;
  photo: IFlickrPhoto[];
  stat: string;
}

export interface IFlickrResponse extends IFlickrPack {
  getNextPage: () => Promise<IFlickrResponse>;
}
