import { bold } from 'chalk'
import express, { Express, Router } from 'express'
import { GlobalExceptionHandler } from './common/exception/global.exception'
import { NotFoundExceptionHandler } from './common/exception/not-found.exception'
import { SwaggerConfig, ConfigService, DatabaseConfig } from './config'
import { TransformInterceptor } from './common/middlewares/transform-interceptor.middleware'

import appRouter from './modules/app/app.routes'
import authRouter from './modules/auth/auth.routes'
import postsRouter from './modules/posts/posts.routes'

export default class Application {
  private app: Express = express()
  private appRouter: Router = Router()
  private configService: ConfigService = new ConfigService()

  constructor() {
    this.configureMiddleware()
    this.setupSwagger()
    this.setupDatabase()
    this.setupRoutes()
    this.setupErrorHandlers()
  }

  private configureMiddleware(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use('/uploads', express.static('uploads'))
    this.app.use(TransformInterceptor)
  }

  private setupErrorHandlers(): void {
    NotFoundExceptionHandler.register(this.app)
    GlobalExceptionHandler.register(this.app)
  }

  private setupRoutes(): void {
    this.appRouter.use(appRouter)
    this.appRouter.use('/auth', authRouter)
    this.appRouter.use('/posts', postsRouter)

    this.app.use(this.appRouter)
  }

  private setupSwagger(): void {
    const path: string = this.configService.get<string>('doc_path')
    SwaggerConfig.setup(this.app, path)
  }

  private async setupDatabase(): Promise<void> {
    await DatabaseConfig.init()
  }

  public async run(port: number, mode: string): Promise<void> {
    this.app.listen(port, () => {
      const runningMode: string = `Server running in ${bold(mode)} mode`
      const runningOnPort: string = `on port ${bold(port)}`
      const runningSince: string = `[since ${new Date().toISOString()}]`

      console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`)
    })
  }
}
