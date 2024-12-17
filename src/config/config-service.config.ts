interface Config {
  app_id: string
  app_port: number
  app_mode: string
  app_url: string
  app_domain: string
  doc_path: string
  is_test: boolean
  is_production: boolean
  is_development: boolean
  firebase_api_key: string
}

export class ConfigService {
  private readonly configs: Map<string, any>

  constructor() {
    this.configs = new Map(Object.entries(this.loadEnv()))
  }

  private loadEnv(): Config {
    return {
      app_id: process.env.APP_ID as string,
      app_port: Number(process.env.APP_PORT),
      app_mode: process.env.NODE_ENV as string,
      app_url: process.env.APP_URL as string,
      app_domain: process.env.APP_DOMAIN as string,
      doc_path: process.env.DOC_PATH as string,
      is_test: process.env.NODE_ENV === 'test',
      is_production: process.env.NODE_ENV === 'production',
      is_development: process.env.NODE_ENV === 'development',
      firebase_api_key: process.env.FIREBASE_API_KEY as string,
    }
  }

  get<T>(key: keyof Config, defaultValue?: T): T {
    const value = this.configs.get(key)
    if (value === undefined && defaultValue !== undefined) {
      return defaultValue
    }
    return value
  }

  static getInstance(): ConfigService {
    return new ConfigService()
  }
}
