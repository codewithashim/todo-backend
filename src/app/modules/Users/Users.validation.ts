import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum(['user', 'admin', 'subadmin']),
    name: z.string({
      required_error: 'Name is required',
    }),
    username: z.string({
      required_error: 'Username is required',
    }),
    bio: z.string().optional(),
    profilePicture: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      email: z.string().optional(),
      role: z.enum(['admin', 'subadmin']).optional(),
      password: z.string().optional(),
    })
    .optional(),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const refreshTokenSchema = z.object({
  cookie: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

export const createUserValidator = {
  createUserZodSchema,
  updateUserZodSchema,
  loginUserZodSchema,
  refreshTokenSchema,
};
