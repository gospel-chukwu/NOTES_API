import { Request, Response } from 'express';
import { User } from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const saltRound = 10;
    const userExists = await User.findOne({ email });
    const secret = process.env.JWT_SECRET as string;

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, saltRound);

    const user = await User.create({ name, email, password: hashPassword });

    const { password: _, __v, ...formattedUser } = user.toObject();

    const token = jwt.sign({ userId: formattedUser._id }, secret, {
      expiresIn: '1h',
    });

    res.status(201).json({ ...formattedUser, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
