"use client"

import { useOrderstore } from '@/src/store'
import { Product } from '@prisma/client'

type AddProductButtonprops = {
  product : Product
}

export default function AddProductButton({product} : AddProductButtonprops) {

  const {addTocart} = useOrderstore(state => state)

  return (
    <button
    onClick={()=> addTocart(product)}
          type="button"
          className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    >Agregar</button>
  )
}
