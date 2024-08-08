"use client"
import React, { useRef, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Image from 'next/image';
import slog from '../../public/s-log.png'
import { Input } from "@/components/ui/input"
import { usePathname } from 'next/navigation';
import { BASE_URL } from '@/constants/baseURL';
import { ScrollArea } from "@/components/ui/scroll-area"



const NavLinks = [
  { name: "MEN", path: "/men"},
  { name: "WOMEN", path: "/women"}
]

const Navbar = ({status}: any) => {
  const pathName = usePathname()
  let timer = useRef<any>(null)
  const [searchItems, setSearchItems] = useState<[]>([])

  const getData = (text: String) => {
    console.log(" get data working");
    fetch(`${BASE_URL}/products/search?text=${text}`)
    .then(res => res.json())
    .then(data => setSearchItems(data.data))
    .catch(err => console.log(err))
  }

  const debounce = (event: any) =>{
    console.log("Debouncing is working");
    if(timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(()=>{
      getData(event.target.value)
  },800)
    
    
  }

  

  return (
    <>
    <div className='grid lg:grid-cols-3 grid-cols-2 gap-2  lg:p-5 px-5 py-2 lg:px-10  sticky top-0 dark:bg-slate-800 bg-white shadow-md'>

        <div key={'IconBox'} className='text-left lg:col-start-1'> 
        <Link href={'/'}>
            {/* <h1 className='font-bold text-2xl'>Super-Mart</h1> */}
            <Image className='ml-3 -mb-1' src={slog} alt='S-Logo' width={40} height={40} />
            
            <span className='text-xs font-bold'>Super Mart</span>
            
        </Link>
        </div>

        <div key={'linksBox'} className='flex gap-5 items-center justify-center lg:col-start-2 lg:row-start-1 row-start-2 col-start-1 col-end-3 ' >
          {NavLinks.map((e) => {
            const isActive = pathName.startsWith(e.path);
            return <Link className={isActive? 'font-bold text-blue-500 underline' : 'font-bold hover:text-blue-500'} href={e.path}>{e.name}</Link>
          })}
            <div className={`flex ${status} items-center`}>
            <span className='text-2xl mr-2'><CiSearch /></span>
            <Input onChange={debounce}  className='border w-full h-8'  type='text' placeholder={`Search for products`} />
            </div>
        </div>

        <div key={'ProfileSideBox'} className='flex items-center justify-end lg:col-start-3 col-start-2'>
            <ThemeToggle />
            <Link className={pathName.startsWith('/login') || pathName.startsWith('/signup')?'font-bold sm:ml-5 ml-3 hover:text-blue-500 flex items-center text-blue-500' : 'font-bold sm:ml-5 ml-3 hover:text-blue-500 flex items-center'} href={'/login'}> <FaUser className='mr-2'/> Login</Link>
            <Link  className={pathName.startsWith('/cart')?'font-bold sm:ml-5 ml-3 hover:text-blue-500 flex items-center text-blue-700 sm:text-2xl text-xl' : 'font-bold sm:ml-5 ml-3 hover:text-blue-400 flex items-center sm:text-2xl text-xl'} href={'/cart'}><FaShoppingCart />
             <span className='text-white bg-red-500 rounded-full text-xs text-center w-5 -ml-3 -mt-5 font-bold'>9</span>
             </Link>
        </div>
    </div>

    {
      searchItems.length > 0 && <div key={'search item Box'} className={`flex justify-center`}>
      <div className={`w-[90%] sm:w-[500px] h-80 p-1 px-2 border fixed m-auto rounded-lg dark:bg-black dark:text-white bg-white overflow-y-scroll`}>
        <div className='flex justify-between border-b sticky -top-1 dark:bg-black bg-white'>
              <div className='text-slate-600'>{searchItems?.length} products found..</div>
              <div className='cursor-pointer text-2xl ' onClick={()=>{
                setSearchItems([])
              }}>X
              </div>   
        </div>
      
      {
        searchItems.map((e: any) => {
          return <Link key={e._id} href={{pathname: "/product", query: {id : e._id} }}>
          <div className='flex h-16 w-full border my-1 rounded-lg overflow-hidden hover:bg-slate-200 dark:hover:bg-gray-900'>
            <div className='w-14 overflow-hidden'>
              <img className='w-full' src={e.image_url} alt="" />
            </div>
            <div className='p-1 px-3 '>
              <h1 className='text-sm'>{e.name}</h1>
              <p className='text-slate-600'>Brand: {e.brand}</p>
            </div>
          </div>
          </Link>
        })
      }
              

      </div>
    </div>
    }
  </>
  )
}

export default Navbar