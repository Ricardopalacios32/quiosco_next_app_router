"use client"

import Link from "next/link"
import { useParams } from "react-router-dom"

type AdminRouteProps = {
    link : {
        url: string, 
        text: string, 
        blank: boolean
    }
}

export default function AdminRoute({link} : AdminRouteProps) {

    const params = useParams()

  return (
    <Link
        className={` ${params.url === link.url ? 'bg-amber-400' : ''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
        href={link.url}
        target={link.blank ? '_blank' : ''}
        rel="noopener noreferrer"
    >{link.text}</Link>
  )
}
