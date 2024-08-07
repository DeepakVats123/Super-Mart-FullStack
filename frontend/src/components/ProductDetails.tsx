import React from 'react'

const ProductDetails = ({ProductData}: any) => {
  return (
    <div className='flex sm:p-10 p-5 gap-10'>
        <div>
            <img src={ProductData.image_url} alt="Product Image" />
        </div>
        <div>
            <h1 className='text-4xl text-slate-700 font-bold'>{ProductData.brand}</h1>
            <p className='text-xl mb-5'>{ProductData.name}</p>
            <p className='font-bold text-green-600'>Special Price</p>
            
            <h1 className='text-2xl font-bold'>Rs {ProductData.price} <span className='text-xl text-slate-600 ml-3'>MRP <span className='mb-0 line-through'> {ProductData.strikedoffprice} </span></span></h1>
            <p className='text-xs text-slate-600'>inclusive of all taxes</p>
        </div>
        
    </div>
  )
}

export default ProductDetails