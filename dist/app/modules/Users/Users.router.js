"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Users_validation_1 = require("./Users.validation");
const Users_controller_1 = require("./Users.controller");
const router = express_1.default.Router();
router.get('/', Users_controller_1.UserController.getAllUsers);
router.get('/:id', Users_controller_1.UserController.getUserById);
router.patch('/:id', (0, validateRequest_1.default)(Users_validation_1.createUserValidator.updateUserZodSchema), Users_controller_1.UserController.updateUser);
router.delete('/:id', Users_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
