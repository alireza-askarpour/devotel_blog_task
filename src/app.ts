import { bold } from 'chalk'
import express, { Express, Router } from 'express'
import { GlobalExceptionHandler } from './common/exception/global.exception'
import { NotFoundExceptionHandler } from './common/exception/not-found.exception'
import { SwaggerConfig } from './config/swagger.config'
import { ConfigService } from './config/config-service.config'

export default class Application {
  private app: Express = express()
  private appRouter: Router = Router()
  private configService: ConfigService = new ConfigService()

  constructor() {
    this.configureMiddleware()
    this.setupErrorHandlers()
    this.setupSwagger()
  }

  private configureMiddleware(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static('public'))
  }

  private setupErrorHandlers(): void {
    NotFoundExceptionHandler.register(this.app)
    GlobalExceptionHandler.register(this.app)
  }

  private setupRoutes(): void {
    // this.appRouter.use("users", usersRouters)
  }

  private setupSwagger(): void {
    const path: string = this.configService.get<string>('doc_path')
    SwaggerConfig.setup(this.app, path)
  }

  public run(port: number, mode: string = 'development'): void {
    this.app.listen(port, () => {
      const runningMode = `Server running in ${bold(mode)} mode`
      const runningOnPort = `on port ${bold(port)}`
      const runningSince = `[since ${new Date().toISOString()}]`

      console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`)
    })
  }
}
