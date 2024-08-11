"use client"
import CartCard from '@/components/CartCard'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const storeData = useSelector((state: any) => state.cartData)
  const localStorageData: any = localStorage.getItem("cartItems")
  let cartData = storeData

  if(cartData.length === 0){
    cartData = JSON.parse(localStorageData)
  }
  console.log(cartData);

  return (
    <>
      <div className='flex gap-5 lg:gap-10 justify-evenly flex-wrap p-2 sm:p-5'>
        <div className='sm:w-[60%] min-w-[300px] w-full border rounded-md shadow-md p-2'>

              {cartData.map((e: any)=>{
                return <CartCard data={e} />
              }) }
        </div>

        <div className='w-[30%] min-w-[300px] border h-fit rounded-md shadow-md'>
          <div >
            <h3 className='text-slate-600 font-bold text-xl text-center m-2'>Price Details</h3>
          </div>
          <hr />

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left'>Price</span>
            <span className='text-right'>₹1000</span>
          </div>

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left'>Discount</span>
            <span className='text-right text-green-500'>-₹100</span>
          </div>

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left'>Delivery Charges</span>
            <span className='text-right'>free</span>
          </div>

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left'>Secured Packaging Fee</span>
            <span className='text-right'>free</span>
          </div>

          <hr />

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left font-bold text-lg'>Total</span>
            <span className='text-right font-bold text-lg'>₹900</span>
          </div>
          
          <hr />

          <div>
            <p className='text-green-500 text-center m-1 text-sm'>You will save ₹13,825 on this order</p>
          </div>


        </div>
        
      </div>
    </>
  )
}

export default Cart