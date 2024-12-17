import { Router } from 'express'
import { _AppController } from './app.controller'

const router = Router()

router.get('/', _AppController.info)

export default router
