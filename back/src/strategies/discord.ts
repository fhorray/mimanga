import { db } from '@/db/config';
import { users, users as usersTable, type InsertUser } from '@/db/schemas';
import { refineInsertUserSchema } from '@/db/validations/users';
import { authServices } from '@/services/authServices';
import { userServices } from '@/services/userServices';
import { password } from 'bun';
import { sql } from 'drizzle-orm';
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
      if (!profile) {
        done({ message: 'erro no profile' }, false);
        return;
      }
      const { id, global_name, username, email } = profile;

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

      // CREATE USER
      // TODO: ZOD validations in others tables
      refineInsertUserSchema.parse(newUser);
      const newUserData = await db.insert(users).values(newUser).returning();
      console.log(newUserData);

      done(null, newUserData[0]);

      console.log(profile.email, typeof profile.email);
    },
  ),
);
