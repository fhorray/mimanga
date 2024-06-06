import express from 'express';
import passport from 'passport';
import { isAdmin } from '@/middlewares/isAdmin';
import { login } from '@/controllers/auth/login';
import { logout } from '@/controllers/auth/logout';
import { me } from '@/controllers/auth/me';
import { createAccount } from '@/controllers/auth/createAccount';

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
authRouter.route('/status').get(isAdmin, me);

authRouter.route('/signup').post(createAccount);

export { authRouter };
