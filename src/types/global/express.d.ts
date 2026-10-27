import { JWTUser } from '../auth.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
    }
  }
}

export {};
