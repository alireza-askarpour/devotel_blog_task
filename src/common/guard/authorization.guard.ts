import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { admin } from '../../config/firebase.config'
import { RESPONSE_MESSAGES } from '../constants/response-messages'

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: RESPONSE_MESSAGES.UNAUTHORIZED })
  }

  const idToken = authHeader.split('Bearer ')[1]
  const decodedToken = await admin.auth().verifyIdToken(idToken)

  req.user = decodedToken
  next()
}
