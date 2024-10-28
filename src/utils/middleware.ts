import { BaseUser } from '../types'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './config'
import { NextFunction, Request, Response } from 'express'
import UserSchema from '../schemas/userSchema'

export interface CustomRequest extends Request {
  token?: string | null
  user?: BaseUser | null
}

export const tokenExtractor = (
  req: CustomRequest,
  _response: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization

  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

export const userExtractor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(
        req.token,
        ACCESS_TOKEN_SECRET as string
      ) as JwtPayload

      if (!decodedToken || !decodedToken.id) {
        req.user = null
        res.status(401).json({ error: 'Invalid token!' })
        return
      }

      req.user = await UserSchema.findById(decodedToken.id)
      if (!req.user) {
        res.status(401).json({ error: 'User not found!' })
        return
      }
    } else {
      req.user = null
    }
    next()
  } catch (error) {
    res.status(401).json({ error: error })
    return
  }
}
