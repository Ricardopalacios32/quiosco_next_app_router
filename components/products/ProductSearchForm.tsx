"use client"
import { SearchSchema } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {
    
    const Router = useRouter()

    const handlesearch = (formdata : FormData) => {

        
        
        const data= {
            search : formdata.get('search')
        }

        const result = SearchSchema.safeParse(data)

        console.log(result)
        
        if(!result.success){
            result.error.issues.forEach(error => {
                toast.error(error.message)
            })

            return
        }

        Router.push(`/admin/products/search?search=${result.data.search}`)
    }

  return (
    <form 
        className=" flex items-center"
        action={handlesearch}
    >
        <input 
            type="text" 
            placeholder="Buscar Producto"
            className=" p-2 placeholder-gray-400 w-full"
            name="search"
        />
        <input 
            type="submit" 
            className=" bg-indigo-600 p-2 uppercase text-white cursor-pointer"
            value={'Buscar'}
        />

    </form>
  )
}
