import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"
import { formatcurrency } from "@/src/utils"


type ProductsCardProps = {
    product : Product
}

export default function ProductsCard({product} : ProductsCardProps) {
  return (
    <div className=" bg-white border">

      <Image 
        width={400}
        height={500}
        src={`/products/${product.image}.jpg`} 
        alt="Imagen Producto" 
      />
      <div className=" p-5">
        <h3 className=" text-2xl font-bold">{product.name}</h3>
        <p className=" mt-5 font-black text-4xl text-amber-500">{formatcurrency(product.price) }</p>
        <AddProductButton
          product={product}
        />
      </div>
        
    </div>
  )
}
