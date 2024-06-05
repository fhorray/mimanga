import {
  authStatus,
  createUser,
  getAllUsers,
} from "@/controllers/authControllers";
import express from "express";

const authRouter = express.Router();

authRouter.route("/").get(getAllUsers).post(createUser);

authRouter.route("/status").get(authStatus);

export { authRouter };
