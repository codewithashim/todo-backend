/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { ITeam, TeamModel } from './Team.interface';

const teamSchema = new Schema<ITeam, Record<string, never>>(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Team = model<ITeam, TeamModel>('Team', teamSchema);
