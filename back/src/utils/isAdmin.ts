import type { Request } from "express";
import type { Session } from "express-session";
import type { CustomRequestData } from "types/types";
import { findUserById } from "./users";

export const isAdmin = async (req: CustomRequestData): Promise<boolean> => {
  if (!req.isAuthenticated() || !req.session.passport?.user) {
    return false;
  }

  const id = req.session.passport?.user;
  const user = await findUserById(id);

  if (!id || !user) return false;

  return user.role === "admin" ? true : false;
};

