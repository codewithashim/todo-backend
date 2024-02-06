import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from './Users.model';
import { IUser } from './Users.interface';

const getAllUsers = async (): Promise<Array<IUser>> => {
  const users = await User.find();
  return users;
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
