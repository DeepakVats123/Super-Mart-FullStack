"use client"
import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Image from 'next/image';
import slog from '../../public/s-log.png'
import { Input } from "@/components/ui/input"
import { usePathname } from 'next/navigation';


const NavLinks = [
  { name: "MEN", path: "/men"},
  { name: "WOMEN", path: "/women"}
]

const Navbar = () => {
  const pathName = usePathname()
  return (
    <div className='grid lg:grid-cols-3 grid-cols-2 gap-2  lg:p-5 px-5 py-2 lg:px-10  sticky top-0 dark:bg-slate-800 bg-white shadow-md'>

        <div className='text-left lg:col-start-1'> 
        <Link href={'/'}>
            {/* <h1 className='font-bold text-2xl'>Super-Mart</h1> */}
            <Image className='ml-3 -mb-1' src={slog} alt='S-Logo' width={40} height={40} />
            
            <span className='text-xs font-bold'>Super Mart</span>
            
        </Link>
        </div>

        <div className='flex gap-5 items-center justify-center lg:col-start-2 lg:row-start-1 row-start-2 col-start-1 col-end-3 ' >
          {NavLinks.map((e) => {
            const isActive = pathName.startsWith(e.path);
            return <Link className={isActive? 'font-bold text-blue-500 underline' : 'font-bold hover:text-blue-500'} href={e.path}>{e.name}</Link>
          })}
            {/* <Link className='font-bold hover:text-blue-500' href={'/'}>Home</Link>
            <Link className='font-bold hover:text-blue-500' href={'/men'}>Men</Link>
            <Link className='font-bold hover:text-blue-500' href={'/women'}>Women</Link> */}
            <span className='text-4xl -mr-3'><CiSearch /></span>
            <Input type='text' placeholder={`Search for products`} />
        </div>

        <div className='flex items-center justify-end lg:col-start-3 col-start-2'>
            <ThemeToggle />
            <Link className='font-bold ml-5 hover:text-blue-500 flex items-center' href={'/login'}> <FaUser className='mr-2'/> Login</Link>
            <Link className='font-bold ml-5 hover:text-blue-400 flex items-center' href={'/cart'}><FaShoppingCart /></Link>
        </div>
    </div>
  )
}

export default Navbar