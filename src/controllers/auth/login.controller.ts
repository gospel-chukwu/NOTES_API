import { Response, Request } from 'express';

export const loginController = (req: Request, res: Response) => {
  res.json({ message: 'User has logged in' });
};
 