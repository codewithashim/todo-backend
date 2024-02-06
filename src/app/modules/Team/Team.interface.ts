/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type ITeam = {
  name: string;
  members: string[];
};

export type TeamModel = Model<ITeam, Record<string, unknown>>;
