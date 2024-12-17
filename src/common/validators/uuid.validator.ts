import Joi from 'joi'

export const UUIDValidator = Joi.object({
  id: Joi.string().uuid().required(),
})
