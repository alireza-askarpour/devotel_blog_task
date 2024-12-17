import { Request, Response } from 'express'

export class AppController {
  public info(req: Request, res: Response) {
    res.json({
      _message: 'Hi there!',
    })
  }
}

export const _AppController = new AppController()
