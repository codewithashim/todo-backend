import express from 'express';
import { TaskController } from './TaskController';

const router = express.Router();
router.post('/create-task', TaskController.createTask);

router.get('/:id', TaskController.getTaskById);

router.get('/', TaskController.getAllTasks);

router.patch('/:id', TaskController.updateTaskById);

router.delete('/:id', TaskController.deleteTaskById);

router.get('/team/:id', TaskController.getTaskByTeamId);

export const TaskRoutes = router;
