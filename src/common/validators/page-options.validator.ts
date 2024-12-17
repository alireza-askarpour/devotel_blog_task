import Joi from 'joi'
import { PageOrder } from '../interfaces/page-order.interface'

export const PageOptionsValidator = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  take: Joi.number().integer().min(1).max(50).default(10),
  order: Joi.string().valid(PageOrder.ASC, PageOrder.DESC).default(PageOrder.ASC),
})
