import { db } from "@/db/config";
import { users, users as usersTable } from "@/db/schemas";
import { isAdmin } from "@/utils/isAdmin";
import { isSelf } from "@/utils/isSelf";
import { findUserById } from "@/utils/users";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

import { StatusCodes, UNAUTHORIZED } from "http-status-codes";
import type { CustomRequestData } from "types/types";

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
      role: usersTable.role,
      favoriteMangas: usersTable.favoriteMangas,
    })
    .from(usersTable);

  res.status(StatusCodes.OK).json(users);
};

// GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      username: true,
      role: true,
      favoriteMangas: true,
    },
    where: (users, { eq }) => eq(users.id, id),
  });

  res.status(StatusCodes.OK).json(user);
};

// UPDATE USER BY ID
export const updateUserById = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    // Verificar a validade do ID
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid user ID" });
    }

    // Validar os dados de entrada
    // Usar o ZOD para validação
    if (!newData || typeof newData !== "object") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid data" });
    }

    // Verify if its ADMIN before update the role.
    if (newData.role === "admin" && !(await isAdmin(req))) {
      res.status(StatusCodes.UNAUTHORIZED).json({ messag: "UNAUTHORIZED" });
    }

    const updatedUser = await db
      .update(usersTable)
      .set(newData)
      .where(eq(usersTable.id, id))
      .returning({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        role: users.role,
        favoriteMangas: users.favoriteMangas,
      });

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "BAD REQUEST" });
  }
};

export const deleteUserById = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se não é admin ou self
    if ((await isSelf(req)) === false) {
      res.status(StatusCodes.UNAUTHORIZED).json({ messag: "UNAUTHORIZED" });
    }

    req.logout(async (err) => {
      await db.delete(users).where(eq(users.id, id));

      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      } else {
        res.status(StatusCodes.OK).send("Logged out");
      }
    });

    return res.send({ message: "deletado" }).redirect("/signin");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "BAD REQUEST" });
  }
};
