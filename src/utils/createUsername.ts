import type { SelectUser, users } from '@/db/schemas';
import { userServices } from '@/services/userServices';

export const createUsername = async (
  newUserData: SelectUser,
  usersTable: typeof users,
) => {
  const users = await userServices.getUsers(usersTable);

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
};
