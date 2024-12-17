import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JoiValidator } from '../../common/utils/joi-validator.util'
import { BaseController } from '../../common/controllers/base.controller'
import { FirebaseAuthService } from './services/firebase-auth.service'
import { LoginValidator, RefreshTokenValidator, SignupValidator } from './validators'

class AuthController extends BaseController {
  private readonly firebaseAuthService: FirebaseAuthService = new FirebaseAuthService()

  public signup = this.catchAsync(async (req: Request, res: Response) => {
    const payload = await JoiValidator.validateAsync(SignupValidator, req.body)
    const userResponse = await this.firebaseAuthService.signup(payload.email, payload.password, payload.displayName)

    res.status(StatusCodes.CREATED).json({
      accessToken: userResponse.idToken,
      refreshToken: userResponse.refreshToken,
    })
  })

  public login = this.catchAsync(async (req: Request, res: Response) => {
    const payload = await JoiValidator.validateAsync(LoginValidator, req.body)
    const authData = await this.firebaseAuthService.login(payload.email, payload.password)

    res.status(StatusCodes.OK).json({
      accessToken: authData.idToken,
      refreshToken: authData.refreshToken,
    })
  })

  public refreshAccessToken = this.catchAsync(async (req: Request, res: Response) => {
    const payload = await JoiValidator.validateAsync(RefreshTokenValidator, req.body)
    const response = await this.firebaseAuthService.refreshAccessToken(payload.refreshToken)

    res.status(StatusCodes.OK).json({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    })
  })

  public getMe = this.catchAsync(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
      user: req.user,
    })
  })
}

export default new AuthController()
