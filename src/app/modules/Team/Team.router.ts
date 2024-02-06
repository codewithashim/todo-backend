import express from 'express';
import { TeamController } from './Team.controller';

const router = express.Router();
router.post('/create-team', TeamController.createTeam);

router.get('/:id', TeamController.getTeamById);

router.get('/', TeamController.getAllTeams);

router.patch('/:id', TeamController.updateTeamById);

router.delete('/:id', TeamController.deleteTeamById);

router.post('/invite/:teamId', TeamController.inviteUserToTeam);

export const TeamRoutes = router;
