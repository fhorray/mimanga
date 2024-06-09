import { db } from "@/db/config";

import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

// GET USER BY ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
    where: (users, { eq }) => eq(users.id, id),
  });

  res.status(StatusCodes.OK).json({ status: "ok", user });
};
