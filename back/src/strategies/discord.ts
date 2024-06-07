import { getAllUsers } from '@/controllers/users/getAllUsers';
import { db } from '@/db/config';
import { users, users as usersTable, type InsertUser } from '@/db/schemas';
import { refineInsertUserSchema } from '@/db/validations/users';
import { userServices } from '@/services/userServices';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

const scopes = ['identify', 'email'];

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_CALLBACK_URL!,
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) {
          done({ message: 'erro no profile' }, false);
          return;
        }
        const { id, global_name, username, email } = profile;

        const users = await userServices.getUsers(usersTable);
        const findUser = users.filter((user) => user.email === email)[0];

        if (!findUser) {
          console.log('Usuario não existe,criar conta ele');

          const newUser: InsertUser = {
            name: global_name ?? 'user 2',
            username: username,
            email: email as string,
            password: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            discordId: id,
            provider: 'discord',
          };

          refineInsertUserSchema.parse(newUser);
          const newUserData = await db
            .insert(usersTable)
            .values(newUser)
            .returning();

          done(null, newUserData[0]);
        } else {
          done(null, findUser);
          console.log('Usuario ja existe, logar ele');
        }

        // done(null, newUserData[0]);

        // CREATE USER
        // TODO: ZOD validations in others tables
      } catch (error) {
        done(error);
      }
    },
  ),
);
