import {Response, Request} from 'express'

export const logoutController = (req: Request, res: Response) => {
   res.json({ message: 'User has logged out' });
 };
