import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'


export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <Link
          href={'/admin/products'}
          className=" bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
      >Volver</Link>
              
      <AddProductForm>
        <ProductForm/>
      </AddProductForm>
    </>
  )
}

