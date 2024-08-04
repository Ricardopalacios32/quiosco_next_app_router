import React from 'react'
import {prisma} from '@/src/lib/prisma'
import ProductsCard from '@/components/products/ProductsCard'
import Heading from '@/components/ui/Heading'

type OrderPageProps ={
  params : {
    category : string
  }
}

async function getProductsByCategory(category : string){
  return await prisma.product.findMany({
      where:{
          category:{
            slug: category
          }
      }
  })
}

export default async function Orderpage({params} : OrderPageProps) {

  const products = await getProductsByCategory(params.category)

  return (

    <>
      <Heading>Elije y personaliza tu pedido a continuacion</Heading>
      <div className=' grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start'>
        {products && products.map(product => (
          <ProductsCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
