import jwt from 'jsonwebtoken';
import { errorResponse } from '../models/common/response';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const generateToken = (
  payload: { username: string; userId: string },
  secret?: string,
  expiresIn?: any,
) : Promise<{ token: string; expireAt: number }>=> {
    const options: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: expiresIn || '24h',
    };
  return new Promise((resolve, reject) => {
    jwt.sign(payload,
      secret || ACCESS_TOKEN_SECRET || '',
      options,
      (error, token) => {
        if (error || !token) reject(error);
        else  {
          const decode = jwt.decode(token) as { exp: number }
            resolve({token, expireAt: decode.exp*1000});

        }
        
      });
  });
};
export const verifyToken = (
  token: string,
  secret?: string,
) : Promise<any>=> {
    const options: jwt.SignOptions = {
      algorithm: 'HS256',
    };
  return new Promise((resolve, reject) => {
    jwt.verify(token,
      secret || REFRESH_TOKEN_SECRET || '',
      (error, decode) => {
        if (error || !decode) reject(error);
        else  {
            resolve(decode);

        }
        
      });
  });
};


export const handleError = (err: any, res: any) => {
     if (err.name === "UnauthorizedError") {
    if (err.inner?.name === "TokenExpiredError") {
      return errorResponse(res, {code: 'TOKEN_EXPIRED', message: 'Access token is expired'}, 401)
    }

    return errorResponse(res, err, 401)
  }

  return errorResponse(res, err, 500)
}
