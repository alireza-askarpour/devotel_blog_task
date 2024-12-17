import { AppDataSource } from './typeorm.config'

export class DatabaseConfig {
  public static async init() {
    try {
      await AppDataSource.initialize()
      console.log('✅ —> Database connected successfully')
    } catch (err: any) {
      console.error(`❌ —> Error during Data Source initialization: ${err.message}`)
      process.exit(1)
    }
  }
}
