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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const Users_model_1 = require("../Users/Users.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_model_1.User.create(payload);
    return user;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = new Users_model_1.User();
    const isUserExist = yield Users_model_1.User.findOne({ email }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // check password
    if (isUserExist.password &&
        !user.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    }
    // create access token and refresh token
    const { role, email: userEmail, profilePicture, bio, name, username, _id } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelper.createToken({
        email: userEmail,
        profilePicture,
        bio,
        name,
        username,
        role,
        _id
    }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    const refreshToken = jwtHelper_1.jwtHelper.createToken({
        email: userEmail,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid refresh token');
    }
    const { email, role } = verifiedToken;
    const user = new Users_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // create access token and refresh token
    const newAccessToken = jwtHelper_1.jwtHelper.createToken({
        email,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return {
        accessToken: newAccessToken,
    };
});
exports.UserService = {
    createUser,
    userLogin,
    refreshToken,
};
