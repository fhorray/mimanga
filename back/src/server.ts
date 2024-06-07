import express from 'express';
import 'dotenv/config';

import { mangasRouter } from '@/routes/Mangas';
import { authRouter } from './routes/Auth';
import { usersRouter } from './routes/Users';
import { sessionUse } from '@/session';

import session from 'express-session';
import pgSession from 'connect-pg-simple';

import passport from 'passport';
import '@/strategies/apitoken';
import '@/strategies/local';
import '@/strategies/bearer';

// APP INIT
const app = express();
app.use(express.json());

// session
app.use(sessionUse);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/mangas', mangasRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});