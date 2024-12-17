import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ConfigService } from '../../config'
import { PageMeta } from '../../interfaces'
import { PostsService } from './posts.service'
import { JoiValidator, deleteFileIfExist } from '../../common/utils'
import { CreatePostValidator, UpdatePostValidator } from './validators'
import { BaseController } from '../../common/controllers/base.controller'
import { RESPONSE_MESSAGES } from '../../common/constants/response-messages'
import { PageOptionsValidator, UUIDValidator } from '../../common/validators'

export class PostsController extends BaseController {
  private postsService: PostsService = new PostsService()
  private configService: ConfigService = new ConfigService()

  public getPostList = this.catchAsync(async (req: Request, res: Response) => {
    const pageOptions = await JoiValidator.validateAsync(PageOptionsValidator, req.query)

    const queryBuilder = this.postsService.createQueryBuilder('posts')
    queryBuilder
      .orderBy('posts.post_id', pageOptions.order || 'ASC')
      .skip(pageOptions.skip || 0)
      .take(pageOptions.take || 10)

    const itemCount = await queryBuilder.getCount()
    const entities = await queryBuilder.getMany()

    const pageMeta: PageMeta = this.createPageMeta(pageOptions, itemCount)

    return res.json({
      data: entities,
      meta: pageMeta,
    })
  })

  public getPostDetails = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = await JoiValidator.validateAsync(UUIDValidator, req.params)
    const post = await this.postsService.getById(id)

    res.status(StatusCodes.OK).json({
      post,
    })
  })

  public createPost = this.catchAsync(async (req: Request, res: Response) => {
    const payload = await JoiValidator.validateAsync(CreatePostValidator, req.body)

    const filePath: string | undefined = req?.file?.path?.replace(/\\/g, '/')
    const appUrl: string = this.configService.get<string>('app_url')
    const image: string | undefined = filePath ? `${appUrl}/${filePath}` : undefined

    const post = await this.postsService.create(payload.title, payload.content, image)

    res.status(StatusCodes.CREATED).json({
      post,
    })
  })

  public updatePost = this.catchAsync(async (req: Request, res: Response) => {
    const [post, { id }, payload] = await Promise.all([
      this.postsService.getById(req?.params?.id),
      JoiValidator.validateAsync(UUIDValidator, req.params),
      JoiValidator.validateAsync(UpdatePostValidator, req.body),
    ])

    const filePath: string | undefined = req?.file?.path?.replace(/\\/g, '/')
    const appUrl: string = this.configService.get<string>('app_url')
    const image: string | undefined = filePath ? `${appUrl}/${filePath}` : undefined

    if (filePath) {
      payload.image = filePath
      const prevFilePath = post.image.split(appUrl)[1]
      deleteFileIfExist(prevFilePath)
    }

    await this.postsService.updateById(id, {
      title: payload.title,
      content: payload.content,
      image,
    })

    res.status(StatusCodes.OK).json({
      message: RESPONSE_MESSAGES.POST_UPDATED_SUCCESS,
    })
  })

  public deletePost = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = await JoiValidator.validateAsync(UUIDValidator, req.params)

    await this.postsService.getById(id)
    await this.postsService.deleteById(id)

    res.status(StatusCodes.OK).json({
      message: RESPONSE_MESSAGES.POST_DELETED_SUCCESS,
    })
  })
}

export default new PostsController()
