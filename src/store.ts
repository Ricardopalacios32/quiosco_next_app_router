
import {create} from 'zustand'
import { orderItem } from './types'
import { Product } from '@prisma/client'

type store = {
    order: orderItem[],
    addTocart: (product : Product)=>void,
    increasequantity : (id : number) =>void,
    decreasequantity : (id : number) =>void
    deleteorder: (id : number)=>void
    clearOrder: ()=>void
    
}

export const useOrderstore = create<store>((set, get) =>({
    order: [],
    addTocart: (product)=>{

        const{categoryId, image, ...data} = product
        let isregistered = get().order.findIndex(item => item.id === product.id)

        if(isregistered !== -1 ){
            get().increasequantity(product.id)
        }else{
            set((state) => ({
                order: [...state.order, {
                    ...data,
                    quantity: 1,
                    subtotal: 1 * product.price
                }]
            }))
        }

        
    },
    increasequantity: (id)=>{
        
        let itemindex = get().order.findIndex(item => item.id === id)

        if(itemindex !== -1 ){
            set((state) => {
                const updatedOrder = [...state.order];
                const existingItem = updatedOrder[itemindex];
                existingItem.quantity += 1;
                existingItem.subtotal = existingItem.quantity * existingItem.price;
                return { order: updatedOrder };
              });
        }
    },
    decreasequantity: (id)=>{
        
        let itemindex = get().order.findIndex(item => item.id === id)

        if(itemindex !== -1 ){
            set((state) => {
                const updatedOrder = [...state.order];
                const existingItem = updatedOrder[itemindex];
                existingItem.quantity -= 1;
                existingItem.subtotal = existingItem.quantity * existingItem.price;
                return { order: updatedOrder };
              });
        }

    },
    deleteorder: (id)=>{
        const order = get().order;
        const itemIndex = order.findIndex((item) => item.id === id);
    
        if (itemIndex !== -1) {
          set((state) => ({
            order: state.order.filter((item) => item.id !== id),
          }));
        }
    },
    clearOrder: ()=>{
        set({
            order: []
        })
    }
})) 