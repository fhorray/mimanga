import { db } from "@/db/config";
import { users, users as usersTable, type SelectUser } from "@/db/schemas";
import { eq } from "drizzle-orm";

// FIND USER BY ID
const findUserById = async (id: string | undefined) => {
  if (!id) {
    throw new Error("Please provide a valid ID");
  }

  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

// FIND USER BY EMAIL
const findUserByEmail = async (email: string): Promise<SelectUser[] | null> => {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user) return null;

  return user;
};

export const userServices = {
  findUserByEmail,
  findUserById,
};
