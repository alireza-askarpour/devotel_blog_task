import { Router } from 'express'
import PostsController from './posts.controller'
import { verifyAccessToken } from '../../common/guard/authorization.guard'
import { uploadPostImage } from '../../common/middlewares/upload.middleware'

const router = Router()

router.get('/', verifyAccessToken, PostsController.getPostList)
router.get('/:id', verifyAccessToken, PostsController.getPostDetails)
router.post('/', verifyAccessToken, uploadPostImage.single('image'), PostsController.createPost)
router.put('/:id', verifyAccessToken, uploadPostImage.single('image'), PostsController.updatePost)
router.delete('/:id', verifyAccessToken, PostsController.deletePost)

export default router
