import { StatusCodes } from "http-status-codes";
import * as jose from "jose";
import type { NextFunction, Request, Response } from "express";
import type { CustomRequestData } from "@/types/types";
import { userServices } from "@/services/userServices";

export const tokenMid = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.session.passport?.user;
    const user = await userServices.findUserById(id);
    console.log(user?.token);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Usuário não encontrado" });
    }

    const token = user?.token;
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token ausente" });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.API_TOKEN)
    );
    const userId = (payload as { userId: string }).userId;

    // Armazenar o usuário na requisição para uso posterior
    req.user = user; // Isso é importante para o Passport

    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    // Lida com erros de verificação do token (expiração, assinatura inválida, etc.)
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token inválido" });
  }
};
