/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';

export type ITask = {
  title: string;
  description: string;
  dueDate: string;
  priorityLevel: string[];
  assignTo: string[];
  taskAuthor:  Schema.Types.ObjectId;
  status?: string;
  team?: string[];
};

export type TaskModel = Model<ITask, Record<string, unknown>>;
