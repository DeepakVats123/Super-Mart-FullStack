import React from 'react'
import { BiSolidOffer } from "react-icons/bi";

const ProductDetails = ({ProductData}: any) => {
  return (
    <div className='sm:flex flex-wrap sm:p-10 p-5 gap-12 sm:mx-20'>
        <div className='overflow-hidden'>
            <img className='m-auto max-w-56' src={ProductData.image_url} alt="Product Image" />
        </div>
        <div className=''>
            <h1 className='text-4xl text-slate-700 font-bold'>{ProductData.brand}</h1>
            <p className='text-xl mb-5'>{ProductData.name}</p>
            <p className='font-bold text-green-600'>Special Price</p>
            
            <h1 className='text-2xl font-bold'>Rs {ProductData.price} <span className='text-xl text-slate-600 ml-3'>MRP <span className='mb-0 line-through'> {ProductData.strikedoffprice} </span></span></h1>
            <p className='text-xs text-slate-600'>inclusive of all taxes</p>
            <hr />
            <span className='text-white bg-green-600 rounded-lg px-2 mr-2'>{ProductData.rating}★</span>
            <span className='text-slate-500 text-sm'>2,242 ratings and 120 reviews</span>
            <span className='text-white bg-blue-700 rounded-lg px-2 font-bold text-sm ml-10'>SUPER-MART Assured</span>
            
            <h1 className='text-xl mt-5 font-bold'>Available offers</h1>
            <span className='flex items-center mb-1 mt-1'> <span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Bank OfferGet 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and above T&C.</span>
            <span className='flex items-center mb-1'><span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Bank Offer5% Cashback on Flipkart Axis Bank Card T&C.</span>
            <span className='flex items-center mb-1'><span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Special PriceGet extra 73% off (price inclusive of cashback/coupon) T&C</span>
            
        </div>
        
    </div>
  )
}

export default ProductDetails