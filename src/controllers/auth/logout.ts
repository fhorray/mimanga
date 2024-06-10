import { db } from "@/db/config";
import { sessions } from "@/db/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  req.session.destroy(async (err) => {
    if (err) {
      console.error("Error destroying session: ", err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    }

    await db.delete(sessions).where(eq(sessions.sid, req.sessionID));
    res.clearCookie("connect.sid");

    req.logout(() => {
      res.status(StatusCodes.OK).json({ message: "logged out" });
    });

    res.status(StatusCodes.OK).json({ message: "logged out" });
  });
};
