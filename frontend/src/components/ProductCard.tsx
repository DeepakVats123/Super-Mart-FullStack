import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const ProductCard = ({details}: any) => {
  return (
    <div className='w-56 h-64 border-4 m-auto'>
        <Image className='w-20' src={details.image_url} alt={"image"} width={60} height={80}/>
        <h3>{details.name}</h3>
        <p>{details.price}</p>
        <Button>Add to Cart</Button>

    </div>
  )
}

export default ProductCard