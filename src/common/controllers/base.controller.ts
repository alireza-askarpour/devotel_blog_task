import { NextFunction, Request, Response } from 'express'

export abstract class BaseController {
  protected catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next)
    }
  }
}
