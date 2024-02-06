import ApiError from '../../../errors/ApiError';
import { ITeam } from './Team.interface';
import { Team } from './Team.model';
import httpStatus from 'http-status';

const createTeam = async (payload: ITeam): Promise<ITeam> => {
  try {
    const team = new Team(payload);
    await team.save();
    return team;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error'
    );
  }
};

const getAllTeam = async (): Promise<ITeam[]> => {
  try {
    const Teams = await Team.find().populate('members');
    return Teams;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error'
    );
  }
};

const getTeamById = async (id: string): Promise<ITeam | null> => {
  try {
    const team = await Team.findById({ _id: id }).populate('members');
    return team;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error'
    );
  }
};

const updateTeamById = async (
  id: string,
  payload: ITeam
): Promise<ITeam | null> => {
  try {
    const result = await Team.findOneAndUpdate(
      { _id: id },
      { ...payload },
      {
        new: true,
      }
    );
    return result;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

const deleteTeamById = async (id: string): Promise<ITeam | null> => {
  try {
    const about = await Team.findByIdAndDelete(id);
    return about;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

// Invite a user to join a team
const inviteUserToTeam = async (
  teamId: string,
  userId: string
): Promise<ITeam | null> => {
  try {
    const team = await Team.findById(teamId);

    console.log(userId, "userId ++ userId");

    console.log(teamId, "team.members ++ team.members");

    console.log(team, "team ++ team");

    if (!team) {
      return null;
    }

    if (team.members.includes(userId)) {
      return null;
    }

    team.members.push(userId);
    await team.save();

    return team;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

export const TeamService = {
  createTeam,
  getAllTeam,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  inviteUserToTeam,
};
