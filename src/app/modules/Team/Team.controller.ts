import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TeamService } from './Team.service';
import sendResponse from '../../../shared/sendResponse';
import { ITeam } from './Team.interface';
import httpStatus from 'http-status';
import { Team } from './Team.model';

const createTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const TeamData = req.body;

    const result = await TeamService.createTeam(TeamData);
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team created successfully!',
      data: result,
    });
  }
);

const getAllTeams: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TeamService.getAllTeam();
    sendResponse<ITeam[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teams fetched successfully!',
      data: result,
    });
  }
);

const getTeamById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TeamService.getTeamById(id);
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team fetched successfully!',
      data: result,
    });
  }
);

const updateTeamById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const TeamData = req.body;
    const result = await TeamService.updateTeamById(id, TeamData);
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team updated successfully!',
      data: result,
    });
  }
);

const deleteTeamById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TeamService.deleteTeamById(id);
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team deleted successfully!',
      data: result,
    });
  }
);

const inviteUserToTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const teamId = req.params.teamId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of the team',
      });
    }

    team.members.push(userId);
    await team.save();

    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team deleted successfully!',
      data: team,
    });
  }
);

export const TeamController = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  inviteUserToTeam,
};
