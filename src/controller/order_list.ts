import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "minimal" })
export const getOrderList = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const OrderList = await prisma.order_list.findMany({
            where: {
                OR: [
                    { customer_name: { contains: search?.toString() || "" } },
                    { order_type: { contains: search?.toString() || "" } }
                ]
            },
            /** contains means search name or address of customer based on sent keyword */
            orderBy: { order_date: "desc" }, /** sort by descending sale date */
            include: { order_detail: {include:{coffe_detail:true}} } /** include detail of sale (item that sold) */
        })
        return response.json({
            status: true,
            data: OrderList,
            message: 'Sale list has retrieved'
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createOrderList = async (request: Request, response: Response) => {
    try {
        const { customer_name, order_type, order_date, order_detail } = request.body
        /** get requested data (data has been sent from request) */
        /** 
         * assume that "sale_details" is an array of object that has keys: egg_id, egg_price, egg_qty, 
         * pack_id, pack_price, pack_qty 
         * */

        /** process to save new sales */
        const newOrderList = await prisma.order_list.create({
            data: { customer_name, order_type, order_date }
        })

        /** loop details of sale to save in database */
        for (let index = 0; index < order_detail.length; index++) {
            const { coffe_id, price, quantity } = order_detail[index]
            await prisma.order_detail.create({
                data: {
                    order_id: newOrderList.id,
                    coffe_id,
                    price: Number(price),
                    quantity: Number(quantity)
                }
            })  
        }
        return response.json({
            status: true,
            data: newOrderList,
            message: 'New Order has created'
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const dropOrder_list = async (request: Request, response: Response) => {
    try {
        const { id } = request.params /** get id of egg's id that sent in parameter of URL */

        /** make sure that data is exists in database */
        const findOrder_list = await prisma.order_list.findFirst({ where: { id: Number(id) } })
        if (!findOrder_list) return response
            .status(200)
            .json({ status: false, message: 'Sale is not found' })

        /** process to delete details of sales */
        let dropOrder_list = await prisma.order_detail.deleteMany({ where: { order_id: Number(id) } })
        /** process to delete of sale */
        let dropOrder_list2 = await prisma.order_list.delete({ where: { id: Number(id) } })

        return response.json({
            status: true,
            data: dropOrder_list,
            message: 'Sale has deleted'
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}
