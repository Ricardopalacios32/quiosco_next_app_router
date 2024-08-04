"use client"

import { OrderSchema } from "@/src/schemas"
import { useOrderstore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { CreateOrder } from "@/actions/OrderActions"
import { toast } from "react-toastify"
import { formatcurrency } from "@/src/utils"




export default function OrderSummary() {


  const {order, clearOrder} = useOrderstore((state) => state)

  const total = useMemo(()=> order.reduce((total, item) => total += item.subtotal, 0),[order])

  const handleSubmit = async (formdata : FormData)=>{

    const data = {
      name: formdata.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)

    if(!result.success){

      result.error.errors.forEach(error => {
        toast.error(error.message)
      })

      return
    }

    const response = await CreateOrder(data)

    if(response?.errors){

      response.errors.forEach(error => {
        toast.error(error.message)
      })

      return
    }

    clearOrder()
    toast.success("Creado Correctamente")

  }

  return (
    <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className=" text-4xl text-center font-black">Mi pedido</h1>

        {order.length=== 0 ? <p className=" text-center my-10">El Pedido esta vacio</p> : (
          <div className=" mt-5">
              {order.length === 0 ? <p className=" text-center my-10">El Pedido esta vacio</p> : (
                <div className=" mt-5">
                    {order.map(item => (
                      <ProductDetails
                        key={item.id}
                        order= {item}
                      />
                    ))}
                    <p className=" text-2xl mt-20 text-center">
                      Total a pagar : {''}
                      <span className=" font-bold">{formatcurrency(total)}</span>
                    </p>
                </div>
              )}

              <form 
                action={handleSubmit}
                className=" w-full mt-10 space-y-5"
              >
                <input 
                  type="text" 
                  placeholder="Tu Nombre"
                  className=" bg-white border border-gray-100 p-2 w-full"
                  name="name"
                />
                <input 
                  type="submit" 
                  className=" py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                  value='Confirmar Pedido'
                />
              </form>
          </div>
        )}
    </aside>
  )
}

