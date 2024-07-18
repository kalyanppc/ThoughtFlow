// utils/jwt.ts
import jwt from 'jsonwebtoken';

export const signToken = (payload: object, secret: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
};
