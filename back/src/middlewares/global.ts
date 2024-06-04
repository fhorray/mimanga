import type { NextFunction, Request, Response } from 'express';

const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware Global');
  next();
};

export { globalMiddleware };
