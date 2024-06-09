import type { CustomRequestData } from "@/types/types";

import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { userServices } from "@/services/userServices";

export const isAdminOrSelf = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction
) => {
  try {
    // logged user info
    const loggedUser = req.user;

    if (!req.isAuthenticated()) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "PLEASE LOGIN FIRST" });
    }

    const requestedUserId = req.params.id || loggedUser?.id;

    const isAdmin = loggedUser?.role === "admin";
    const isSelf = loggedUser?.id === requestedUserId;

    if (isAdmin === false && isSelf === false) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "FORBIDDEN: You are not authorized to access this resource",
      });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED 1" });
  }
};
