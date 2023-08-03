import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_KEY } = process.env

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationClient = req.headers['authorization']

  const token = authorizationClient && authorizationClient.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    jwt.verify(token, JWT_KEY || 'VincentTang');

    next()
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: 'Token expired' });
    }

    return res.status(403).json({ message: 'Unauthorized' })
  }
}


