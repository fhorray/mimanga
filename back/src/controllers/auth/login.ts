import { db } from "@/db/config";
import { users } from "@/db/schemas";
import { userServices } from "@/services/userServices";
import type { CustomRequestData } from "@/types/types";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jose from "jose";

// LOGIN
export const login = async (req: CustomRequestData, res: Response) => {
  try {
    const id = req.session.passport?.user;
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User ID not found in session" });
    }

    const user = await userServices.findUserById(id);
    if (!user) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }

    // TODO: configure JWT if needed, now this only assign a JWT inside the user's 'token' column
    const jwt = await new jose.SignJWT({ userId: user?.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("20s")
      .sign(new TextEncoder().encode(process.env.API_TOKEN));

    await db.update(users).set({ token: jwt }).where(eq(users.id, id));

    res.status(StatusCodes.OK).json({ message: `Welcome ${user?.username}!` });
  } catch (error) {
    console.error("Error logging in: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logging in" });
  }
};
