import Joi from 'joi'

export const UpdatePostValidator = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
})
