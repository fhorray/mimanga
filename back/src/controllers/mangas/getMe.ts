import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CustomRequestData } from "@/types/types";
import { userServices } from "@/services/userServices";

// LOGGED USER INFO
export const getMe = async (req: CustomRequestData, res: Response) => {
  const user = req.user;

  // const user = await userServices.findUserById(id as string);

  res.status(StatusCodes.OK).json({ status: "ok", user });
};
