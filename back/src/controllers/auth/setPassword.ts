import { authServices } from '@/services/authServices';
import { userServices } from '@/services/userServices';
import type { CustomRequestData } from '@/types/types';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// SET A LOCAL PASSWORD AFTER LOGIN WITH DISCORD OR GOOGLE
export const createAccount = async (req: CustomRequestData, res: Response) => {
  try {
    const newData = req.body;
    const id = req.session.passport?.user;
    console.log(newData);
    console.log(id);

    if (!id) {
      res.send('NO ID PROVIDED');
    }

    await userServices.updateUser(newData, id as string);

    console.log(await userServices.findUserById(id as string));

    res.send('DISCORD DONE');
  } catch (error) {
    const typedError = error as Error;

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: typedError.message });
  }
};
