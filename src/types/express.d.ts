import type { JwtPayload } from '../utils/jwt';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
