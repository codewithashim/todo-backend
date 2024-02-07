"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("./TaskController");
const router = express_1.default.Router();
router.post('/create-task', TaskController_1.TaskController.createTask);
router.get('/:id', TaskController_1.TaskController.getTaskById);
router.get('/', TaskController_1.TaskController.getAllTasks);
router.patch('/:id', TaskController_1.TaskController.updateTaskById);
router.delete('/:id', TaskController_1.TaskController.deleteTaskById);
router.get('/team/:id', TaskController_1.TaskController.getTaskByTeamId);
exports.TaskRoutes = router;
