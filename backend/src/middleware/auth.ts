import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  userId?: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] || '';
  try {
    const user = jwt.verify(authHeader, process.env.JWT_SECRET as string) as JwtPayload;
    if (user) {
      req.userId = user.id;
      next();
    } else {
      res.status(403).json({ message: 'You are not logged in' });
    }
  } catch (e) {
    res.status(403).json({ message: 'You are not logged in' });
  }
};

export default verifyToken;
