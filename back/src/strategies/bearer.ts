import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import * as jose from 'jose';
import { users } from '../db/schemas'; // Seu esquema de usuários
import { db } from '../db/config';
import { eq } from 'drizzle-orm';
import { findUserById } from '@/utils/users';

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.API_TOKEN!),
      );

      // get user id
      const userId = (payload as { userId: string }).userId;

      // search user inside db
      const user = await findUserById(userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
