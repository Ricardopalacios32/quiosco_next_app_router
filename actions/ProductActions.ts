"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export async function createProduct(data: unknown){
    const result = ProductSchema.safeParse(data)

    

    if(!result.success){
        console.log(result.error.issues)
        return {
            errors : result.error.issues
        }
    }

    await prisma.product.create({
        data : result.data
    })
}

export async function editProduct(data : unknown, id: number) {

    
    const result = ProductSchema.safeParse(data)

    

    if(!result.success){
        console.log(result.error.issues)
        return {
            errors : result.error.issues
        }
    }

    await prisma.product.update({
        where: {
            id
        },
        data : result.data
    })
    revalidatePath('/admin/products')
}