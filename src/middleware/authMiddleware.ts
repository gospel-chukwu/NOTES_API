import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWTUser } from '../types/auth.types.js';

const NoTokenProvided = (res: Response) =>
  res.status(401).json({ message: 'Access Denied: No Token Provided' });

const isJWTUser = (value: unknown): value is JWTUser => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'userId' in value &&
    typeof value.userId === 'string'
  );
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NoTokenProvided(res);
  }

  try {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET as string;
    if (!token) {
      return NoTokenProvided(res);
    }
    const verified = jwt.verify(token, secret);

    if (!isJWTUser(verified)) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = verified;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};
