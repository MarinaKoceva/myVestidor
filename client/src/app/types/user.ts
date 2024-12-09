export interface User {
  //themes: string[];
  //posts: string[];
  _id: string;
  //tel: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  username: string;
  email: string;
  //phoneNumber: string;
  password: string;
  _id: string;
  accessToken: string;
}

export interface ProfileDetails {
  _id: string;
  username: string;
  email: string;
}
