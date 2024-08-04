"use client"
import { editProduct } from "@/actions/ProductActions";
import { ProductSchema } from "@/src/schemas";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";



export default  function EditProductForm({children} : {children : ReactNode}) {

    const params = useParams()

    const handleSubmit =  async (formdata : FormData) =>{

        const data = {
            name: formdata.get('name'),
            price: formdata.get('price'),
            categoryId : formdata.get('categoryId'),
            image: 'cafe_01'
        }
        
        const id = +params.id!

        const result = ProductSchema.safeParse(data)

        if(!result.success){
            result.error.issues.forEach(error => {
                toast.error(error.message)
            })
            return
        }

        

        const response = await editProduct(data, id)

        if(response?.errors){
            response.errors.forEach(error => {
                toast.error(error.message)
            })
            return

        }

        toast.success("Actualizado Correctamente")
        
        redirect(`/admin/products`)

    }

  return (
    <div className=" bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form 
            action={handleSubmit}
            className=" space-y-5"
        >
            {children}
            <input 
                type="submit"  
                className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase cursor-pointer"
                value='Guardar cambios'
            />
        </form>
    </div>
  )
}
