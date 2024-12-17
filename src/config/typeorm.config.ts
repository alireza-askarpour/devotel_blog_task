import { DataSource } from 'typeorm'
import { User } from '../modules/users/entities/user.entity'
import { configDotenv } from 'dotenv'

configDotenv()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
})
