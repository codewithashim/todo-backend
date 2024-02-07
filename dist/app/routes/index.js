"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_router_1 = require("../modules/Users/Users.router");
const Task_router_1 = require("../modules/Task/Task.router");
const Team_router_1 = require("../modules/Team/Team.router");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: Users_router_1.UserRoutes,
    },
    {
        path: '/tasks',
        route: Task_router_1.TaskRoutes,
    },
    {
        path: '/teams',
        route: Team_router_1.TeamRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
