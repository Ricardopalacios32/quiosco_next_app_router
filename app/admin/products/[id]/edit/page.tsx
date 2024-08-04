import { products } from "@/prisma/data/products"
import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"
import Heading from "@/components/ui/Heading"
import ProductForm from "@/components/products/ProductForm"
import EditProductForm from "@/components/products/EditProductForm"
import GoBackButtom from "@/components/ui/GoBackButtom"

async function GetoProductsbyId(idParam : number){
    const product = await prisma.product.findUnique({
        where:{
            id: idParam
        }
    })

    return product
}

export default async function EditProductsPage({params} : {params : {id: string}}) {

    const product = await GetoProductsbyId(+params.id)

    if(!product){
        notFound()
    }

    console.log(product)
  return (
    <>
        <Heading>Editar Producto : {product.name}</Heading>
        <GoBackButtom/>
        <EditProductForm>
            <ProductForm
                product= {product}
            />
        </EditProductForm>
    </>
  )
}
