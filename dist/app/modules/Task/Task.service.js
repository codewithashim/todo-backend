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
exports.TaskService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const Task_model_1 = require("./Task.model");
const http_status_1 = __importDefault(require("http-status"));
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new Task_model_1.Task(payload);
        (yield (yield task.save()).populate('team')).populate('assignTo');
        return task;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getAllTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_model_1.Task.find().populate('team').populate('assignTo');
        return tasks;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_model_1.Task.findById({ _id: id })
            .populate('team')
            .populate('assignTo');
        return task;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getTaskByTeamId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTaskByTeam = yield Task_model_1.Task.findOne({ team: id })
            .populate('team')
            .populate('assignTo');
        return getTaskByTeam;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
const updateTaskById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Task_model_1.Task.findOneAndUpdate({ _id: id }, Object.assign({}, payload), {
            new: true,
        })
            .populate('team')
            .populate('assignTo');
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
const deleteTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const about = yield Task_model_1.Task.findByIdAndDelete(id);
        return about;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
});
exports.TaskService = {
    createTask,
    getAllTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getTaskByTeamId,
};
