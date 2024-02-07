"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Users_validation_1 = require("../Users/Users.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(Users_validation_1.createUserValidator.createUserZodSchema), auth_controller_1.UserController.createUser);
router.post('/login', (0, validateRequest_1.default)(Users_validation_1.createUserValidator.loginUserZodSchema), auth_controller_1.UserController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(Users_validation_1.createUserValidator.refreshTokenSchema), auth_controller_1.UserController.refreshToken);
exports.AuthRoutes = router;
