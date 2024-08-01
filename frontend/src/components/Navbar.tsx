import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'
import superMartLogo from '../../public/super-mart-logo.png'



const Navbar = () => {
  return (
    <div className='grid sm:grid-cols-3 grid-cols-2 gap-5 border-2 p-5 bg-'>

        <div className='text-left sm:col-start-1'> 
        <Link href={'/'}>
            <h1 className='font-bold text-2xl'>Super-Mart</h1>
        </Link>
        </div>

        <div className='flex gap-5 items-center justify-center sm:col-start-2 sm:row-start-1 row-start-2 col-start-1 col-end-3' >
            <Link className='font-bold hover:text-blue-400' href={'/'}>Home</Link>
            <Link className='font-bold hover:text-blue-400' href={'/men'}>Men</Link>
            <Link className='font-bold hover:text-blue-400' href={'/women'}>Women</Link>
        </div>

        <div className='flex items-center justify-end sm:col-start-3 col-start-2'>
            <ThemeToggle />
            <Link className='font-bold ml-5 hover:text-blue-400' href={'/login'}>Login</Link>
            <Link className='font-bold ml-5 hover:text-blue-400' href={'/cart'}>MyCart</Link>
        </div>
    </div>
  )
}

export default Navbar