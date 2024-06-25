import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema for detail of sale */
const OrderListDetailSchema = Joi.object({
    coffe_id: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().required()
})

/** create schema when add new sale's data, all of fileds have to be required */
const addDataSchema = Joi.object({
    customer_name: Joi.string().required(),
    order_type: Joi.string().required(),
    order_date: Joi.string().required(),
    order_detail: Joi.array().items(OrderListDetailSchema).min(1).required()
})
 
export const verifyaddList = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}
