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
  username?: string;
  realname?: string;
  profileUrl?: string;
  photoUrl?: string;
  taken?: string;
  description?: string;
  tags?: string[]; 
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

export interface IReduxAction {
  type: string;
  payload?: any;
}

export interface IPhotosState {
  searchType: string;
  searchTerm: string | null;
  photo: IFlickrPhoto[];
  pageNumber: number | null;
  perPage: number;
  pages: number | null;
}
