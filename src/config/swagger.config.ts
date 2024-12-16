import { join } from 'path'
import { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

export class SwaggerConfig {
  static setup(app: Express, path: string) {
    const swaggerDefinition = this.getSwaggerDefinition(path)

    const swaggerSetup = swaggerUI.setup(
      swaggerJSDoc({
        swaggerDefinition,
        apis: [join(process.cwd(), '/src/modules/**/*.swagger.ts')],
      }),
    )

    app.use('/swagger', swaggerUI.serve, swaggerSetup)
  }

  private static getSwaggerDefinition(url: string) {
    return {
      openapi: '3.0.0',
      info: {
        title: 'Express Store',
        version: '1.0.0',
        description: 'The e-commerce website.',
        contact: {
          name: 'Alireza Askarpour',
          email: 'askarpourdev@gmail.com',
        },
      },
      server: [
        {
          url: '/swagger',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ BearerAuth: [] }],
    }
  }
}
