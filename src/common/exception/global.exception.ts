import { NextFunction, Response, Request, Express } from 'express'
import createHttpError, { HttpError } from 'http-errors'

export class GlobalExceptionHandler {
  public static register(app: Express): void {
    app.use(this.handleError)
  }

  private static handleError(err: HttpError, req: Request, res: Response, next: NextFunction): void {
    const serverError = createHttpError.InternalServerError()

    const statusCode = err.status || serverError.status
    const message = err.message || serverError.message

    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })
  }
}
