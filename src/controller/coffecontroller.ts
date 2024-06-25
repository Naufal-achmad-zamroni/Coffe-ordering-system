import {  Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global"

const prisma = new PrismaClient();

export const getCoffe=async(request:Request,response:Response)=>{
    try{
        const{search}=request.query
        const allcoffe=await prisma.coffe.findMany({
            where:{name:{contains:search?.toString()||""}},
            orderBy: {
                name: "asc"
            }
        })

        return response.json({
            status:true,
            data:allcoffe,
            message:`Coffe has retrived`
        }).status(200)

    }catch(error){
        return response.json({
            status:false,
            message:`There is an error. ${error}`
        })
        .status(400)
    }
}

export const createCoffe=async (request:Request,response:Response)=>{
    try{
        const {name,price,size}=request.body
        let filename=""
        if(request.file)filename=request.file.filename

        const newCoffe =  await prisma.coffe.create({
            data:{name,price:Number(price),size:String(size), image:filename}
        })

        return response.json({
            status:true,
            data:newCoffe,
            message:`New coffe has created`
        })
    }catch(error){
        return response.json({
            status:false,
            message:`There is an error. ${error}`
        })
        .status(400)
        
    }
}

export const updatedCoffe = async (request: Request, response: Response) => {
    try {
        const { id } = request.params /** get id of egg's id that sent in parameter of URL */
        const { name, price, size } = request.body /** get requested data (data has been sent from request) */

        /** make sure that data is exists in database */
        const findCoffe = await prisma.coffe.findFirst({ where: { id: Number(id) } })
        if (!findCoffe) return response
            .status(200)
            .json({ status: false, message: `Coffe is not found` })

        let filename = findCoffe.image /** default value of variable filename based on saved information */
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/../public/coffe-image/${findCoffe.image}`
            let exists = fs.existsSync(path)
            if (exists && findCoffe.image !== ``) fs.unlinkSync(path)

            /** this code use to delete old exists file if reupload new file */
        }

        /** process to update egg's data */
        const updatedCoffe = await prisma.coffe.update({
            data: {
                name: name || findCoffe.name,
                price: price ? Number(price) : findCoffe.price,
                size: size ? String(size) : findCoffe.size,
                image: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedCoffe,
            message: `Coffe menu has updated`
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
export const dropCoffe = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        /** make sure that data is exists in database */
        const findCoffe = await prisma.coffe.findFirst({ where: { id: Number(id) } })
        if (!findCoffe) return response
            .status(200)
            .json({ status: false, message: `Coffe is not found` })

        /** prepare to delete file of deleted egg's data */
        let path = `${BASE_URL}/public/Coffe-image/${findCoffe.image}` /** define path (address) of file location */
        let exists = fs.existsSync(path)
        if (exists && findCoffe.image !== ``) fs.unlinkSync(path) /** if file exist, then will be delete */

        /** process to delete egg's data */
        const deletedCoffe = await prisma.coffe.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedCoffe,
            message: `Coffe has deleted`
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