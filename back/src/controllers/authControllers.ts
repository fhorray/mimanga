import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from 'types/types';

import { db } from '@/db/config';
import { users as usersTable, type SelectUser } from '@/db/schemas';

import * as bcrypt from 'bcryptjs';

import { sql } from 'drizzle-orm';
import { findUserById } from '@/utils/users';

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).send('Successfully logged in!');
  } catch (error) {
    console.error('Error logging in: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error logging in' });
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

  res.send('Logged out');
};

// CREATE ACCOUNT
export const createAccount = async (req: CustomRequestData, res: Response) => {
  // get the new user data from body request
  const newUserData: SelectUser = req.body;
  const users = await db.select().from(usersTable);

  // hash the password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newUserData.password, salt);

  if (!newUserData.email || !newUserData.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'NO USER INFORMATION PROVIDED' });
  }

  // creation of the username
  if (!newUserData.username) {
    const username = newUserData.email.split('@')[0];
    const usernameExists = users.find((user) => user.username === username);

    if (usernameExists) {
      // if already exists create another username using the email + seconds
      newUserData.username =
        username + Math.floor(Math.random() * 10) + new Date().getSeconds();
    } else {
      newUserData.username = username;
    }
  }

  // create user inside db
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
export const authStatus = async (req: CustomRequestData, res: Response) => {
  const userId = req.session.passport?.user;
  const user = await findUserById(userId);

  res.status(StatusCodes.OK).json({ message: 'YOUR USER STATUS', user });
};
