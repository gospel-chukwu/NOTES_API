import { Response, Request } from 'express';

export const refreshController = (req: Request, res: Response) => {
  res.json({ message: 'Session refreshed.. New access token' });
};