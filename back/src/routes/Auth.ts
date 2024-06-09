import express from "express";
import passport from "passport";
import { isAdmin } from "@/middlewares/isAdmin";
import { login } from "@/controllers/auth/login";
import { logout } from "@/controllers/auth/logout";
import { createAccount } from "@/controllers/auth/createAccount";
import { isSelf } from "@/middlewares/isSelf";
import { isAdminOrSelf } from "@/middlewares/isAdminOrSelf";

const authRouter = express.Router();

authRouter.route("/signin").post(
  passport.authenticate("local", {
    successRedirect: "/api/v1/users/@me",
    failureRedirect: "/api/v1/auth/signin",
  }),
  login
);

// DISCORD strategie
authRouter.get("/discord", passport.authenticate("discord"));
authRouter.get(
  "/discord/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/api/v1/auth/discord",
    successRedirect: "/api/v1/users/me",
  })
);

authRouter.route("/signout").get(logout);

authRouter.route("/signup").post(createAccount);

export { authRouter };
