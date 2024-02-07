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
exports.TeamService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const Team_model_1 = require("./Team.model");
const http_status_1 = __importDefault(require("http-status"));
const createTeam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = new Team_model_1.Team(payload);
        yield team.save();
        return team;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getAllTeam = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Teams = yield Team_model_1.Team.find().populate('members');
        return Teams;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield Team_model_1.Team.findById({ _id: id }).populate('members');
        return team;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const updateTeamById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Team_model_1.Team.findOneAndUpdate({ _id: id }, Object.assign({}, payload), {
            new: true,
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
const deleteTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const about = yield Team_model_1.Team.findByIdAndDelete(id);
        return about;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
// Invite a user to join a team
const inviteUserToTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield Team_model_1.Team.findById(teamId);
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
        yield team.save();
        return team;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
exports.TeamService = {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeamById,
    deleteTeamById,
    inviteUserToTeam,
};
