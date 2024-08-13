import React, { useState } from 'react'
import { BiSolidOffer } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from './ui/use-toast';
import { BASE_URL } from '@/constants/baseURL';
import { addToCart } from '@/redux/features/userSlice';
import { Button } from './ui/button';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductDetails = ({ProductData}: any) => {
  const storeData: any = useSelector((state: any)=> state.authToken)
  const tokenFromLS: any = localStorage.getItem("superMart-token")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const {toast} = useToast()
  const authToken = storeData.authToken || JSON.parse(tokenFromLS)

  function addToCartFn(product: any, token: String){
    if(JSON.parse(tokenFromLS) == null){
      console.log("Token Not found");
      toast({
        title: "Login Required",
        description: "Please Login to perform this opration"
      })
    }
    setLoading(true)
    const url = `${BASE_URL}/users/add-to-cart`

             fetch(url,{
                method: 'POST',
                body: JSON.stringify({userID: token,cartData: product}),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                }
              }
            )
            .then(res => res.json())
            .then(res2 => {
                console.log(res2.data);
                dispatch(addToCart(res2.data))
                setLoading(false)
            })
            .catch(err =>{
              console.log(err)
              setLoading(false)
            } )
  }
  return (
    <>
        {
          Object.keys(ProductData).length > 0 ?
          <div className='sm:flex flex-wrap p-10 gap-10 mx-10'>
          <div className='overflow-hidden mt-5'>
              <img className='max-w-60' src={ProductData.image_url} alt="Product Image" />
          </div>

          <div className='mt-5 sm:mt-0'>
              <h1 className='text-4xl text-slate-700 font-bold'>{ProductData.brand}</h1>
              <p className='text-xl'>{ProductData.name}</p>
              <p className='text-sm mb-3 text-slate-600 font-bold'> For {ProductData.category}</p>
              <div className=''>
              <Button onClick={()=>{
                  addToCartFn(ProductData, authToken)
              }} className='h-8 align-middle border-black hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:border-white dark:hover:bg-white' variant={'outline'} disabled={loading}>Add to Cart</Button>
              </div>

              <p className='font-bold text-green-600 mt-3'>Special Price</p>
              
              <h1 className='text-2xl font-bold'>Rs {ProductData.price} <span className='text-xl text-slate-600 ml-3'>MRP <span className='mb-0 line-through'> {ProductData.strikedoffprice} </span></span></h1>
              <p className='text-xs text-slate-600'>inclusive of all taxes</p>
              <hr />
              <span className='text-white bg-green-600 rounded-lg px-2 mr-2'>{ProductData.rating}★</span>
              <span className='text-slate-500 text-sm'>2,242 ratings and 120 reviews</span>
              <span className='text-white bg-blue-700 rounded-lg px-2 font-bold text-sm ml-10'>SUPER-MART Assured</span>
  
              <h1 className='text-xl mt-5 font-bold'>Available offers</h1>
              <span className='flex items-center mb-1 mt-1'> <span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Bank OfferGet 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and above T&C.</span>
              <span className='flex items-center mb-1'><span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Bank Offer5% Cashback on Flipkart Axis Bank Card T&C.</span>
              <span className='flex items-center mb-1'><span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Special PriceGet extra 73% off (price inclusive of cashback/coupon) T&C.</span>
              <span className='flex items-center mb-1'><span className=' mr-2 text-green-600 text-2xl'><BiSolidOffer /></span> Partner OfferMake a purchase and enjoy a surprise cashback/ coupon that you can redeem later! Know More.</span>
              
          </div>
          </div>
          :

          <div className='p-10'>
          <ProductCardSkeleton />
          </div>
        }
    </>
  )
}

export default ProductDetails