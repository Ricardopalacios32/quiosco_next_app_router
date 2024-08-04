import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
    return await prisma.product.count()
}

async function GetProducts(page : number, pageSize : number){
    const products = await prisma.product.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        include:{
            category:true,
        }

    })

    return products
}


export default async function ProductsPage({searchParams} : {searchParams: {page: string}}) {

    const page = +searchParams.page || 1
    const pageSize = 10

    if(page < 0) {
        redirect('/admin/products')
    }

    const [products, totalProducts] = await Promise.all([GetProducts(page, pageSize), productCount()]) 

    const totalpages= Math.ceil(totalProducts/ pageSize)
   
    if(page > totalpages) {
        redirect('/admin/products')
    }

  return (
    <>
        <Heading>Administrar Productos</Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link
                href={'/admin/products/new'}
                className=" bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
            >Crear Producto</Link>
            <ProductSearchForm/>  
        </div>
        <ProductTable
            products={products}
        />
        <ProductPagination
            page={page}
            totalpages={totalpages}
        />
    </>
  )
}