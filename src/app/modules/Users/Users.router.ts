import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidator } from './Users.validation';
import { UserController } from './Users.controller';
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.patch(
  '/:id',

  validateRequest(createUserValidator.updateUserZodSchema),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
