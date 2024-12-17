import axios from 'axios'
import { ConfigService } from '../../../config'
import { admin } from '../../../config/firebase.config'

export class FirebaseAuthService {
  private API_KEY: string
  private readonly API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts'
  private readonly TOKEN_URL = 'https://securetoken.googleapis.com/v1/token'
  private configService: ConfigService = new ConfigService()

  constructor() {
    this.API_KEY = this.configService.get('firebase_api_key')
  }

  public async login(email: string, password: string) {
    return this.authenticate(email, password)
  }

  public async signup(email: string, password: string, displayName: string) {
    await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
      displayName: displayName,
    })

    const authData = await this.authenticate(email, password)

    return authData
  }

  public async refreshAccessToken(refreshToken: string) {
    const { data } = await axios.post(`${this.TOKEN_URL}?key=${this.API_KEY}`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })

    return {
      accessToken: data.id_token,
      refreshToken: data.refresh_token,
    }
  }

  private async authenticate(email: string, password: string) {
    const { data } = await axios.post(`${this.API_URL}:signInWithPassword?key=${this.API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    })
    return data
  }

  public async getUserDataFromToken(token: string): Promise<any> {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const user = await admin.auth().getUser(decodedToken.uid)

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    }
  }
}
