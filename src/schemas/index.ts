import {z} from 'zod'

export const OrderSchema = z.object({
    name: z.string()
            .min(1, 'Tu Nombre es Obligatorio'),
    total: z.number()
            .min(1,'El total es Obligatorio'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
        .refine(products => products.length > 0 , 'La lista de productos es obligatoria')
                
    
})

export const OrderIdSchema = z.object({
    orderid: z.string()
                .transform((value)=> parseInt(value))
                .refine(value => value > 0, {message: 'Hay errores'})
})

export const SearchSchema = z.object({
    search : z.string()
            .trim()
            .min(1, 'La busqueda no puede estar vacia')
})



export const ProductSchema = z.object({
    name : z.string()
            .min(1,'El nombre es Obligatorio'),
    price: z.string()
            .min(1,'El precio es Obligatorio')
            .transform((value)=> parseInt(value))
            .refine(value => value > 0, {message: 'Hay errores en el precio'}),
    categoryId: z.string()
            .min(1,'La categoria es Obligatoria')
            .transform((value)=> parseInt(value))
            .refine(value => value > 0, {message: 'Hay errores en el precio'}),
    image: z.string()
            .min(1,'La imagen es Obligatoria')
})