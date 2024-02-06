/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";

export type IUser = {
  email: string;
  role: ENUM_USER_ROLE;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type ILoginUserResponse = {
  accessToken?: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};


export type ILoginUser = {
  email: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
