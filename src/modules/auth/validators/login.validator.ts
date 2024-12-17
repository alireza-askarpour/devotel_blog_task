import Joi from 'joi'

export const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})
