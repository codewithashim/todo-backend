import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./Users.interface";
import { UserService } from "./Users.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "users fetched successfully!",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user fetched successfully!",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user deleted successfully!",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
