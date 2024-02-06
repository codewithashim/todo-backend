import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../Users/Users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from '../Users/Users.interface';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const user = await User.create(payload);
  return user;
};

const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const user = new User();

  const isUserExist = await User.findOne({ email }).select('+password');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // create access token and refresh token

  const {
    role,
    email: userEmail,
    profilePicture,
    bio,
    name,
    username,
    _id
  } = isUserExist;
  const accessToken = jwtHelper.createToken(
    {
      email: userEmail,
      profilePicture,
      bio,
      name,
      username,
      role,
      _id
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  const refreshToken = jwtHelper.createToken(
    {
      email: userEmail, // Use the renamed variable userEmail
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }

  const { email, role } = verifiedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // create access token and refresh token
  const newAccessToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  userLogin,
  refreshToken,
};
