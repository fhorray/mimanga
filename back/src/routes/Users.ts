import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '@/controllers/usersControllers';

import { isAdmin } from '@/middlewares/isAdmin';
import { isAdminOrSelf } from '@/middlewares/isAdminOrSelf';

import express from 'express';

const usersRouter = express.Router();

usersRouter.route('/').get(isAdmin, getAllUsers);

usersRouter
  .route('/:id')
  .get(isAdminOrSelf, getUserById)
  .patch(isAdminOrSelf, updateUserById)
  .delete(isAdminOrSelf, deleteUserById);

export { usersRouter };
