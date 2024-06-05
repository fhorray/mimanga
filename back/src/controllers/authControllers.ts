import * as express from 'express';

import { mockUsers } from '@/db/mockUsers';
import type { Request, Response } from 'express';
import type { Session } from 'express-session';
import { StatusCodes } from 'http-status-codes';
import type { CustomSessionData } from 'types/types';
import { db } from '@/db/config';
import {
  users as usersTable,
  type InsertUser,
  type SelectUser,
} from '@/db/schemas';

import * as bcrypt from 'bcryptjs';

import { eq, sql } from 'drizzle-orm';
import { findUserById } from '@/utils/users';

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.select().from(usersTable);

  res.status(200).send(users);
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
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
export const createAccount = async (
  req: Request & { session: Session & Partial<CustomSessionData> },
  res: Response,
) => {
  const newUserData: SelectUser = req.body;
  const users = await db.select().from(usersTable);

  // HASH THE PASSWORD
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newUserData.password, salt);

  if (!newUserData.email || !newUserData.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'NO USER INFORMATION PROVIDED' });
  }

  // USERNAME CREATION
  if (!newUserData.username) {
    const username = newUserData.email.split('@')[0];
    const usernameExists = users.find((user) => user.username === username);

    if (usernameExists) {
      // SE esse username já existir com base no email ja existir, criar um username com base no email + um número com 3 digitos aleatorios + os segundos do horario atual.os
      newUserData.username =
        username + Math.floor(Math.random() * 10) + new Date().getSeconds();
    } else {
      newUserData.username = username;
    }
  }

  // verify if user is admin in order to pass role as 'admin' inside de req.
  if (newUserData.role === 'admin') {
    const isLoggedIn = req.isAuthenticated();

    if (!isLoggedIn) {
      const userId = req.session.passport?.user;
      const user = await findUserById(userId);

      if (!user)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'UNAUTHORIZED' });

      if (user.role === 'admin') {
        newUserData.role = 'admin';
      }
      newUserData.role = 'user';
    }
  }

  const createdUser = await db
    .insert(usersTable)
    .values({
      ...newUserData,
      password: hashedPassword,
      username: newUserData.username,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      password: sql<string>`'********'`.as('usersTable.password'),
      username: usersTable.username,
      role: usersTable.role,
    });

  res
    .status(StatusCodes.OK)
    .json({ message: 'Account created!', userInformation: createdUser });
};

// AUTH STATUS
export const authStatus = async (
  req: Request & { session: Session & Partial<CustomSessionData> },
  res: Response,
) => {
  const isLoggedIn = req.isAuthenticated();

  if (!isLoggedIn) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'UNAUTHORIZED' });
  }

  const userId = req.session.passport?.user;
  const user = await findUserById(userId);

  res.status(StatusCodes.OK).json({ message: 'YOUR USER STATUS', user });
};
