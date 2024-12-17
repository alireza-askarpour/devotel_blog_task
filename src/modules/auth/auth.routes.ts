import { Router } from 'express'
import AuthController from './auth.controller'
import { verifyAccessToken } from '../../common/guard/authorization.guard'

const router = Router()

router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshAccessToken)
router.get('/@me', verifyAccessToken, AuthController.getMe)

export default router
