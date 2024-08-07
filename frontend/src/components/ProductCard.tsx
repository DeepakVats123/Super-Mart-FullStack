import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const ProductCard = ({details, path}: any) => {
  return (
    <div className='border m-auto max-w-64 rounded-lg overflow-hidden hover:shadow-2xl hover:border-2 hover:border-gray-600'>
        <div className=''>
            <Link href={`${path}/${details._id}`}>
            <img className='w-full overflow-hidden' src={details.image_url} alt={"image"} />
            </Link>
        </div>
        
        <div className='p-3'>
            <div className='flex justify-between'>
                <div><span className='font-bold'>{details.brand}</span></div>
                <div><span className='font-bold'>{details.rating} </span><span className='font-bold text-green-600'>★</span></div>
            </div>
         
        <p className='text-xs text-slate-600'>{details.name}</p>
        <span className='text-sm font-bold'>Rs. {details.price}</span>
        <span className='text-sm line-through ml-3 font-bold text-slate-600'>{details.strikedoffprice}</span>
        <br />

        <div className='text-center p-2'>
            <Button className='h-8 align-middle border-black hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:border-white dark:hover:bg-white' variant={'outline'}>Add to Cart</Button>
        </div>
        
        </div>

    </div>
  )
}

export default ProductCard