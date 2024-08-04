
import { useOrderstore } from '@/src/store'
import { orderItem } from '@/src/types'
import { formatcurrency } from '@/src/utils'
import { XCircleIcon, MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { stat } from 'fs'
import { useMemo } from 'react'

type ProductDetailsProps = {
    order : orderItem
}



export default function ProductDetails({order} : ProductDetailsProps) {

    const {increasequantity, decreasequantity, deleteorder} = useOrderstore(state => state)
    const disabledecrease = useMemo(() => order.quantity === 1 , [order.quantity])
    const disableincrease = useMemo(() => order.quantity === 50 , [order.quantity])

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <p className="text-xl font-bold">{order.name} </p>

                <button
                type="button"
                onClick={() => deleteorder(order.id)}
                >
                <XCircleIcon className="text-red-600 h-8 w-8"/>
                </button>
            </div>
            <p className="text-2xl text-amber-500 font-black">
                {formatcurrency(order.price)}
            </p>
            <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                <button
                type="button"
                onClick={() => decreasequantity(order.id)}
                disabled= {disabledecrease}
                className=' disabled:opacity-20'
                >
                    <MinusIcon className="h-6 w-6"/>
                </button>

                <p className="text-lg font-black ">
                {order.quantity}
                </p>

                <button
                type="button"
                onClick={() => increasequantity(order.id)}
                disabled= {disableincrease}
                className=' disabled:opacity-20'
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>
            <p className="text-xl font-black text-gray-700">
                Subtotal: {''}
                <span className="font-normal"> 
                    {formatcurrency(order.subtotal)}
                </span>
            </p>
        </div>
    </div>
  )
}
