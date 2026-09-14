import { Request, Response } from 'express';
import { User } from '../../models/User.js';

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({name, email, password})

    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
  // res.json({ message: 'User has registered' });
};
