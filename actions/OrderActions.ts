"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { OrderIdSchema, OrderSchema } from "@/src/schemas"


export async function CreateOrder(data : unknown) {

    const result = OrderSchema.safeParse(data)

    if (result.success) {
        await prisma.order.create({
            data:{
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
        
    
    } else {
        return { errors: result.error.issues };
    }
    
}

export async function CompleteOrder(formdata : FormData){
    const orderid= formdata.get('order_id')

    

    const result = OrderIdSchema.safeParse({orderid})

    if(!result.success){
        console.log(result.error)
        return
    }

    try {
        await prisma.order.update({
            where: {
                id: result.data.orderid
            },
            data: {
                status: true,
                orderReadyAt:new Date(Date.now())
            }
        })

        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }
}