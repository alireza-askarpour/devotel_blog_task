import Joi from 'joi'

export const RefreshTokenValidator = Joi.object({
  refreshToken: Joi.string().required(),
})
