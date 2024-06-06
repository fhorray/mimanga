import type { Request } from "express";
import type { Session } from "express-session";
import type { CustomRequestData } from "types/types";
import { findUserById } from "./users";
import { db } from "@/db/config";

export const isSelf = async (req: CustomRequestData): Promise<boolean> => {
  // Search  logged in user's ID
  const userId = req.session.passport?.user;
  if (!userId) return false;

  // Get the params ID
  const { id } = req.params;
  if (!id) return false;

  return userId === id ? true : false;
};
