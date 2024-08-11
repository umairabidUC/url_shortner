import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface Props{
    icon:JSX.Element
    name:string;
    href:string;
    expanded: boolean;
}
function SidebarItem({icon,name, href, expanded}:Props) {
  return (
    <Link href={href}>
        <div className='bg-gray-800 hover:bg-gray-700 cursor-pointer my-4 p-3 rounded-lg inline-flex gap-2'>
              {icon} {expanded ? <h2 className='text-white'>{name}</h2> : "" }
        </div>
    </Link>
  )
}

export default SidebarItem  