"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

type CategoryiconProps = {
    category : Category
}

export default function Categoryicon({category} : CategoryiconProps) {

    const params = useParams()

  return (
    <div className={` ${params.category === category.slug ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
        <div className=" h-16 ">
            <Image
                width={64}
                height={64}
                src={`/icon_${category.slug}.svg`} 
                alt="imagen_categoria" 
            />

        </div>
        <Link 
            className={` text-xl font-bold  ${params.category === category.slug ? 'text-indigo-800' : ''}`}
            href={`/order/${category.slug}`}
        >{category.name}</Link>

    </div>
  )
}
 