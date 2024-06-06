import { db } from "@/db/config";
import { users as usersTable, type SelectUser } from "@/db/schemas";

export const findUserById = async (id: string | undefined) => {
  const users: SelectUser[] = await db.select().from(usersTable);
  const findUser = users.find((user) => user.id === id);

  return findUser;
};
