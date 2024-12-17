import { Request, Response, NextFunction } from 'express'

interface TransformedResponse<T> {
  statusCode: number
  reqId: string | undefined
  message: string | null
  response: T | null
}

export const TransformInterceptor = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send

  res.send = function (body?: any) {
    const reqId = req.headers['x-request-id'] || (req as any)['reqId']
    const statusCode = res.statusCode
    let message: string | null = null
    let responseData: any = null

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        message = body
      }
    }

    if (body && typeof body === 'object') {
      if (body.message) {
        message = body.message
      } else {
        responseData = body
      }
    }

    const transformedBody: TransformedResponse<any> = {
      statusCode,
      reqId: reqId ? String(reqId) : undefined,
      message,
      response: responseData,
    }

    return originalSend.call(this, JSON.stringify(transformedBody))
  }

  next()
}
