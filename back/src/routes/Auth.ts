import express from "express";
import {
  authStatus,
  createAccount,
  login,
  logout,
} from "@/controllers/authControllers";
import passport from "passport";

const authRouter = express.Router();

authRouter.route("/signin").post(
  passport.authenticate("local", {
    // successRedirect: '/api/v1/auth/status',
    failureRedirect: "/api/v1/auth/signin",
  }),
  login
);

authRouter.route("/signout").get(logout);

authRouter.route("/status").get(authStatus);

authRouter.route("/signup").post(createAccount);

export { authRouter };
