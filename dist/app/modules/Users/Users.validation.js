"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum(['user', 'admin', 'subadmin']),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        username: zod_1.z.string({
            required_error: 'Username is required',
        }),
        bio: zod_1.z.string().optional(),
        profilePicture: zod_1.z.string().optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        email: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'subadmin']).optional(),
        password: zod_1.z.string().optional(),
    })
        .optional(),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const refreshTokenSchema = zod_1.z.object({
    cookie: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refreshToken is required',
        }),
    }),
});
exports.createUserValidator = {
    createUserZodSchema,
    updateUserZodSchema,
    loginUserZodSchema,
    refreshTokenSchema,
};
