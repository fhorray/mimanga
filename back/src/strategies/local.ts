import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from "../db/schemas";
import { db } from "../db/config";
import { eq } from "drizzle-orm";
import { userServices } from "@/services/userServices";
import { validatePassword } from "@/utils/validatePassword";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    // VERIFY CALLBACK: This is the function that will be called to verify the user
    async (email, password, done) => {
      try {
        const user = await userServices.findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Usuário não encontrado" });
        }

        // USE Bcrypt to validate the password
        const isValid = await validatePassword(user[0], password);
        if (!isValid) {
          return done(null, false, { message: "Senha inválida" });
        }

        return done(null, user[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
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
