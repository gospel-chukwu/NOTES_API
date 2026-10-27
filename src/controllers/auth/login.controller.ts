import { Response, Request } from 'express';
import { User } from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET as string;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({ message: 'Invalid email or password' });

    const { password: _, __v, ...formattedUser } = user.toObject();

    const token = jwt.sign({ userId: formattedUser._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ ...formattedUser, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
