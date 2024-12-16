import dotenv from 'dotenv'
import Application from './app'
import { ConfigService } from './config/config-service.config'
dotenv.config()

const app = new Application()
const configService: ConfigService = new ConfigService()

const port = configService.get<number>('app_port') as number
const mode = configService.get<string>('app_mode') as string

app.run(port, mode)
