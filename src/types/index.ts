import { Order, OrderProducts, Product } from "@prisma/client";
import { z } from "zod";
import { OrderSchema } from "../schemas";

export type orderItem = Pick<Product, 'id' | 'name' | 'price'> &{
    quantity: number,
    subtotal: number
}

export type Zorder = z.infer<typeof OrderSchema>

export type OrderWithProducts = Order & {
    orderProducts : (OrderProducts & {
        product: Product
    })[]
}