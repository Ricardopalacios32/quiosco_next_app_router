import Link from 'next/link'
import React from 'react'

type ProductPaginationProps = {
    page: number
    totalpages: number
}

export default function ProductPagination({page, totalpages}: ProductPaginationProps) {

    const pages = Array.from({length: totalpages}, (_, i) => i+1)

    console.log(pages)

  return (
    <nav className=' flex justify-center py-10'>

        {page > 1 && (
           <Link
                href={`/admin/products?page=${page-1}`}
                className=' bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
            >&laquo;</Link>
        )}

        {pages.map(currentpage => (
            <Link
                key={currentpage}
                href={`/admin/products?page=${currentpage}`}
                className={`${page === currentpage ? ' bg-amber-400' : 'bg-white' } px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
            >{currentpage}</Link>
        ))}

        {page < totalpages && (
           <Link
                href={`/admin/products?page=${page+1}`}
                className=' bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
            >&raquo;</Link>
        )}
        
    </nav>
  )
}
