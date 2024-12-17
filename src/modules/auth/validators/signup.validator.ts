import Joi from 'joi'

export const SignupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  displayName: Joi.string().required(),
})
