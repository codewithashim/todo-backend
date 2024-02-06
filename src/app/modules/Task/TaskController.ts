import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TaskService } from './Task.service';
import sendResponse from '../../../shared/sendResponse';
import { ITask } from './Task.interface';
import httpStatus from 'http-status';

const createTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskData = req.body;
    const result = await TaskService.createTask(taskData);
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task created successfully!',
      data: result,
    });
  }
);

const getAllTasks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TaskService.getAllTask();
    sendResponse<ITask[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tasks fetched successfully!',
      data: result,
    });
  }
);

const getTaskById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TaskService.getTaskById(id);
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task fetched successfully!',
      data: result,
    });
  }
);

const updateTaskById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const taskData = req.body;
    const result = await TaskService.updateTaskById(id, taskData);
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task updated successfully!',
      data: result,
    });
  }
);

const deleteTaskById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TaskService.deleteTaskById(id);
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task deleted successfully!',
      data: result,
    });
  }
);

const getTaskByTeamId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TaskService.getTaskByTeamId(id);
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task fetched successfully!',
      data: result,
    });
  }
);

export const TaskController = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTaskByTeamId,
};
