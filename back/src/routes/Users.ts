import { deleteUser } from '@/controllers/users/deleteUser';
import { getAllUsers } from '@/controllers/users/getAllUsers';
import { getUser } from '@/controllers/users/getUser';
import { updateUser } from '@/controllers/users/updateUser';
import { isAdmin } from '@/middlewares/isAdmin';
import { isAdminOrSelf } from '@/middlewares/isAdminOrSelf';

import express from 'express';

const usersRouter = express.Router();

usersRouter.route('/').get(isAdmin, getAllUsers);

usersRouter
  .route('/:id')
  .get(isAdminOrSelf, getUser)
  .patch(isAdminOrSelf, updateUser)
  .delete(isAdminOrSelf, deleteUser);

export { usersRouter };
