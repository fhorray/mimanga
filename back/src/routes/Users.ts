import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "@/controllers/usersControllers";

import express from "express";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);

usersRouter
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export { usersRouter };
