export interface IRegister {
  username: string;
  password: string;
  email: string;
  fullname: string;
}

export type AuthMiddlewareData = {
  id: string;
};

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  userId?: number;
  fullname?: string;
  username?: string;
}

export interface IThread {
  id?: number;
  content?: string;
  userId: number;
  threadId?: number;
  images?: IImage[];
  // create?: number;
}

export interface IEditProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  fullname?: string;
  username?: string;
}

export interface IImage {
  id?: number;
  image: string;
  threadId?: number;
}