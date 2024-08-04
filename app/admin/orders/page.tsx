"use client"

import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import useSWR from 'swr'
import { OrderWithProducts } from '@/src/types'



export default function OrdersPage() {

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url)
    .then(res => res.json())
    .then(data => data)

  const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus:false
  })

  const orders = data

  if(isLoading) return 'Cargando...'

  if(orders) return (
   <>
      <Heading>Administra Ordenes</Heading>
      {orders.length > 0 ? 
      (
        <div className=' grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order = {order}
            />

          ))}
        </div>
      ): 
      <p className=' text-center'>No hay ordenes Pendientes</p>
      }
   </>
  )
}
