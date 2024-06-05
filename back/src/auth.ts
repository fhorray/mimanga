import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { users, type SelectUser } from './db/schemas';
import { db } from './db/config';
import { eq } from 'drizzle-orm';

const findUser = async (email: string): Promise<SelectUser[] | null> => {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user) return null;

  return user;
};

const validatePassword = async (user: SelectUser, password: string) => {
  // Implemente a validação da senha
  if (user.password === password) return true;

  return false;
};

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    // VERIFY CALLBACK: This is the function that will be called to verify the user
    async (email, password, done) => {
      try {
        const user = await findUser(email);
        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado' });
        }

        // USE Bcrypt to validate the password
        const isValid = await validatePassword(user[0], password);
        if (!isValid) {
          return done(null, false, { message: 'Senha inválida' });
        }

        return done(null, user[0]);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// These functions are used to store the user in the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Armazene o ID do usuário na sessão
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user) return done(null, false);

    done(null, user[0]);
  } catch (error) {
    done(error);
  }
});
