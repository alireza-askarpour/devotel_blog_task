import { Express, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export class NotFoundExceptionHandler {
  public static register(app: Express): void {
    app.use(this.handleError)
  }

  private static handleError(req: Request, res: Response, next: NextFunction): void {
    next(createHttpError.NotFound(`Can't find ${req.originalUrl} on the server!`))
  }
}
