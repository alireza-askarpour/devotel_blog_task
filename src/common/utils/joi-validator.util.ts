import createHttpError from 'http-errors'
import { ObjectSchema, ValidationOptions } from 'joi'

export class JoiValidator {
  private static defaultOptions: ValidationOptions = {
    abortEarly: false,
    stripUnknown: true,
  }

  public static validate<T>(schema: ObjectSchema<T>, data: any, options: ValidationOptions = this.defaultOptions): T {
    const { error, value } = schema.validate(data, options)

    if (error) {
      const errorDetails = this.formatErrorMessage(error.message)
      throw new createHttpError.BadRequest(`Validation error: ${errorDetails}`)
    }

    return value
  }

  public static async validateAsync<T>(
    schema: ObjectSchema<T>,
    data: any,
    options: ValidationOptions = this.defaultOptions,
  ): Promise<T> {
    try {
      return await schema.validateAsync(data, options)
    } catch (error: any) {
      if (error.isJoi) {
        const errorDetails = this.formatErrorMessage(error.message)
        throw new createHttpError.BadRequest(`Validation error: ${errorDetails}`)
      }
      throw error
    }
  }

  private static formatErrorMessage(message: string): string {
    return message.replace(/["\[\]\d]/g, '')
  }
}
