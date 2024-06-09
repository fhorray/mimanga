import { db } from "@/db/config";
import { users, users as usersTable, type SelectUser } from "@/db/schemas";
import { sql } from "drizzle-orm";

import type { Request, Response } from "express";

import { createUsername } from "@/utils/createUsername";
import { hashPassword } from "@/utils/hashPassword";

const createUser = async (req: Request, res: Response) => {
  try {
    // get the new user data from body request
    const newUserData: SelectUser = req.body;

    // hash the password
    const hashedPassword = await hashPassword(newUserData);

    // creation of the username
    await createUsername(newUserData, users);

    // TODO: Erro in password
    return await db
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
        password: sql<string>`'********'`.as("usersTable.password"),
        username: usersTable.username,
        role: usersTable.role,
        discordId: usersTable.discordId,
        provider: usersTable.provider,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });
  } catch (error) {
    const typedError = error as Error;
    console.error("An error occurred while inserting data:", typedError);
    throw new Error(
      "An error occurred while inserting data: " + typedError.message
    );
  }
};

export const authServices = { createUser };
