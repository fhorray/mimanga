import { mockUsers } from "@/db/mockUsers";
import type { Request, Response } from "express";
import type { Session } from "express-session";
import session from "express-session";
import { StatusCodes } from "http-status-codes";
import type { CustomSessionData } from "types/mangaProps";

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  res.status(200).send(mockUsers);
};

// CREATE A USER
export const createUser = async (
  req: Request & { session: Session & Partial<CustomSessionData> },
  res: Response
) => {
  const { email, password } = req.body;
  const users = mockUsers;

  const findUser = users.find((user) => user.email === email);
  if (!findUser) return res.status(404).json({ error: "BAD CREDENTIALS" });

  if (findUser.email !== email && findUser.password !== password) {
    return res.status(401).json({ message: "BAD CREDENTIALS" });
  }

  req.session.user = findUser;

  console.log(req.session.user);

  res.status(200).send(findUser);
};

// AUTH STATUS
export const authStatus = async (
  req: Request & { session: Session & Partial<CustomSessionData> },
  res: Response
) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  req.session.user
    ? res.status(StatusCodes.OK).send(req.session.user)
    : res.status(StatusCodes.UNAUTHORIZED).send({ message: "UNAUTHORIZED" });
};
