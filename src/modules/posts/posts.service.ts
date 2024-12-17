import createHttpError from 'http-errors'
import { QueryRunner, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'
import { Post } from './entities/post.entity'
import { AppDataSource } from '../../config'
import { RESPONSE_MESSAGES } from '../../common/constants/response-messages'

export class PostsService {
  private postsRepository: Repository<Post>

  constructor() {
    this.postsRepository = AppDataSource.getRepository(Post)
  }

  public async getAll(): Promise<Post[]> {
    return await this.postsRepository.find()
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Post> {
    return this.postsRepository.createQueryBuilder(alias, queryRunner)
  }

  public async getById(postId: string): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ post_id: postId })

    if (!post) {
      throw new createHttpError.NotFound(RESPONSE_MESSAGES.POST_NOT_FOUND)
    }

    return post
  }

  public async create(title: string, content: string, image: string | undefined): Promise<Post> {
    const newPost = this.postsRepository.create({ title, content, image })
    return await this.postsRepository.save(newPost)
  }

  public async updateById(postId: string, data: Partial<Post>): Promise<UpdateResult> {
    const post = await this.getById(postId)

    const updatedPost = { ...post, ...data }
    return await this.postsRepository.update(postId, updatedPost)
  }

  public async deleteById(postId: string): Promise<void> {
    const post = await this.getById(postId)
    await this.postsRepository.remove(post)
  }
}

export const postService = new PostsService()
