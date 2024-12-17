import { NextFunction, Request, Response } from 'express'
import { PageOptions } from '../interfaces/page-options.interface'
import { PageMeta } from '../interfaces/page-meta.interface'

export abstract class BaseController {
  protected catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next)
    }
  }

  protected createPageMeta(pageOptions: PageOptions, itemCount: number): PageMeta {
    const pageCount = Math.ceil(itemCount / (pageOptions.take || 10))
    return {
      page: pageOptions.page || 1,
      take: pageOptions.take || 10,
      itemCount: itemCount,
      pageCount: pageCount,
      hasPreviousPage: (pageOptions.page || 1) > 1,
      hasNextPage: (pageOptions.page || 1) < pageCount,
    }
  }
}
