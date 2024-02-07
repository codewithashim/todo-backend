"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Team_controller_1 = require("./Team.controller");
const router = express_1.default.Router();
router.post('/create-team', Team_controller_1.TeamController.createTeam);
router.get('/:id', Team_controller_1.TeamController.getTeamById);
router.get('/', Team_controller_1.TeamController.getAllTeams);
router.patch('/:id', Team_controller_1.TeamController.updateTeamById);
router.delete('/:id', Team_controller_1.TeamController.deleteTeamById);
router.post('/invite/:teamId', Team_controller_1.TeamController.inviteUserToTeam);
exports.TeamRoutes = router;
