import express from 'express';
import { UserRoutes } from '../modules/Users/Users.router';
import { TaskRoutes } from '../modules/Task/Task.router';
import { TeamRoutes } from '../modules/Team/Team.router';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/tasks',
    route: TaskRoutes,
  },
  {
    path: '/teams',
    route: TeamRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
