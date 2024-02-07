"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const Team_service_1 = require("./Team.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const Team_model_1 = require("./Team.model");
const createTeam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TeamData = req.body;
    const result = yield Team_service_1.TeamService.createTeam(TeamData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team created successfully!',
        data: result,
    });
}));
const getAllTeams = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Team_service_1.TeamService.getAllTeam();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teams fetched successfully!',
        data: result,
    });
}));
const getTeamById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Team_service_1.TeamService.getTeamById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team fetched successfully!',
        data: result,
    });
}));
const updateTeamById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const TeamData = req.body;
    const result = yield Team_service_1.TeamService.updateTeamById(id, TeamData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team updated successfully!',
        data: result,
    });
}));
const deleteTeamById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Team_service_1.TeamService.deleteTeamById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team deleted successfully!',
        data: result,
    });
}));
const inviteUserToTeam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const teamId = req.params.teamId;
    const team = yield Team_model_1.Team.findById(teamId);
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
    yield team.save();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team deleted successfully!',
        data: team,
    });
}));
exports.TeamController = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamById,
    deleteTeamById,
    inviteUserToTeam,
};
