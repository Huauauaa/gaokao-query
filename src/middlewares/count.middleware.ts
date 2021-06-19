import { Request, Response, NextFunction } from 'express';

export function count(req: Request, res: Response, next: NextFunction) {
  console.log('count');
  next();
}
