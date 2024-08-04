import {prisma} from '@/src/lib/prisma'
import Categoryicon from '../ui/Categoryicon'
import Logo from '../ui/Logo'

async function getCategories() {
  return prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categories = await getCategories()

  return (
    <aside className=" pt-8 md:w-72 md:h-screen bg-white">
        <Logo/>
        {categories && categories.map(category => (
          <Categoryicon
            key={category.id}
            category = {category}
          />
        ))}
    </aside>
  )
}
