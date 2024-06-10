import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CustomRequestData } from "@/types/types";
import { userServices } from "@/services/userServices";

// LOGGED USER INFO
export const getMe = async (req: CustomRequestData, res: Response) => {
  try {
    const id = req.session.passport?.user;
    const user = await userServices.findUserById(id as string);

    if (!user) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
    res.status(StatusCodes.OK).json({ status: "ok", user });
  } catch (error) {
    console.error("Error getting user info: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error getting user info" });
  }
};
