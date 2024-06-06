import express from 'express';
import {
  authStatus,
  createAccount,
  login,
  logout,
} from '@/controllers/authControllers';
import passport from 'passport';
import { isAdmin } from '@/middlewares/isAdmin';

const authRouter = express.Router();

authRouter.route('/signin').post(
  passport.authenticate('local', {
    // successRedirect: '/api/v1/auth/status',
    failureRedirect: '/api/v1/auth/signin',
  }),
  login,
);

authRouter.route('/signout').get(logout);

// TODO: remove this route in production, it'll not be used
authRouter.route('/status').get(isAdmin, authStatus);

authRouter.route('/signup').post(createAccount);

export { authRouter };
