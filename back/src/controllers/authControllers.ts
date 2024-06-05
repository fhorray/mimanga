import * as express from 'express';

import { mockUsers } from '@/db/mockUsers';
import type { Request, Response } from 'express';
import type { Session } from 'express-session';
import { StatusCodes } from 'http-status-codes';
import type { CustomSessionData } from 'types/types';
import { db } from '@/db/config';
import { users as usersTable } from '@/db/schemas';

import bcrypt from 'bcrypt';

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.select().from(usersTable);

  res.status(200).send(users);
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await db.select().from(usersTable);

    const findUser = users.find((user) => user.email === email);

    if (!findUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'BAD INFORMATION' });
    }

    // VERIFICAR SE A SENHA ESTÁ CORRETA
    if (findUser.email !== email || findUser.password !== password) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'BAD INFORMATION' });
    }

    const isLoggedIn = req.isAuthenticated();
    console.log('ESTA LOGADO? ', isLoggedIn);

    res.status(StatusCodes.OK).send('Successfully logged in!');
  } catch (error) {
    console.error('Error logging in: ', error);
    return res.status(500).json({ error: 'Error logging in' });
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(StatusCodes.OK).send('Logged out');
    }
  });

  const isLoggedIn = req.isAuthenticated();
  console.log('ESTA LOGADO? ', isLoggedIn);

  res.send('Logged out');
};

// CREATE ACCOUNT
export const createAccount = async (req: Request, res: Response) => {
  const newUserData = req.body;
  if (!newUserData.email || !newUserData.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'NO USER INFORMATION PROVIDED' });
  }

  const createdUser = await db
    .insert(usersTable)
    .values(newUserData)
    .returning();

  res
    .status(StatusCodes.OK)
    .json({ message: 'Account created!', user: createdUser });
};

// AUTH STATUS
export const authStatus = async (
  req: Request & { session: Session & Partial<CustomSessionData> },
  res: Response,
) => {
  const isLoggedIn = req.isAuthenticated();
  console.log('ESTA LOGADO? ', isLoggedIn);

  if (!isLoggedIn) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'UNAUTHORIZED' });
  }

  if (isLoggedIn) {
    return res.status(StatusCodes.OK).json({ message: 'AUTHORIZED' });
  }

  res.status(StatusCodes.OK).json({ message: 'STATUS INFO' });
};
