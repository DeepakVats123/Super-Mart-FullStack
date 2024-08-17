"use client"
import CartCard from '@/components/CartCard'
import EmptyCart from '@/components/EmptyCart'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/constants/baseURL'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const [lsCartData,setLsCartData] = useState<any>(null)
  const [tokenFromLS, setTokenFromLS] = useState<any>("")
  const storeData = useSelector((state: any) => state)
  let cartData = storeData.cartData.length? storeData.cartData : JSON.parse(lsCartData) 

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  

  // if(cartData.length === 0){
  //   cartData = JSON.parse(lsCartData)
  // }
  // console.log(cartData);
  const total = Array.isArray(cartData) ? cartData.reduce((acc: any, e:any)=> acc + (e.price * e.quantity), 0) : 0
  const MrpPrice = Array.isArray(cartData) ? cartData.reduce((acc: any, e:any)=> acc + (Number(e.strikedoffprice) * e.quantity), 0) : 0
  const cartItemsCount = Array.isArray(cartData) ? cartData.reduce((acc, product)=>{
     return acc + (product.quantity)
  },0)
  : 0;

  const cartCardActionFn = async (urlEndPoint: String,product: {},token: string,method: any) => {
    const url = `${BASE_URL}/${urlEndPoint}`
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`,
        }
      })
      const res2 = await res.json()
      // console.log(res2)
      dispatch(method(res2.data))
      setLoading(false)
      
    } catch (error) {
      console.log("cartApiError", error) 
    }

  }

  useEffect(()=>{
    setLsCartData(localStorage.getItem("cartItems"))
    setTokenFromLS(localStorage.getItem("superMart-token"))
  },[storeData])

  return (
    <>
      {
        !Array.isArray(cartData) || cartData.length===0 ? <EmptyCart /> :

        <div className='flex gap-5 lg:gap-10 justify-center flex-wrap p-2 sm:p-5'>

        <div className='md:w-[40%] max-h-[340px] sm:max-h-[450px] min-w-[370px] border rounded-md shadow-md p-2 h-auto scroll-smooth overflow-y-scroll '>

              {cartData.map((e: any)=>{
                return <CartCard key={e._id} data={e} cartCardActionFn={cartCardActionFn} token={tokenFromLS} loading={loading} />
              }) }
        </div>

        <div className='w-[30%] min-w-[300px] border h-fit rounded-md shadow-md'>
          <div >
            <h3 className='text-slate-600 font-bold text-xl text-center m-2'>Price Details</h3>
          </div>
          <hr />

          <div className='flex justify-between px-5 m-3'>
            <span className='text-left'>Price ({cartItemsCount} items)</span>
            <span className='text-right'>₹{total}</span>
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
            <span className='text-right font-bold text-lg'>₹{total-100 || 0}</span>
          </div>
          
          <hr />

          <div className='text-center py-2'>
          <Button
            className="text-xl align-middle border-slate-500 bg-orange-600 text-white font-bold hover:bg-orange-500 rounded-md px-2 py-2"
            variant={"outline"}
            disabled={loading}
          >
            Place Order
          </Button>
          </div>

          <hr />

          <div>
            <p className='text-green-500 text-center m-1 text-sm'>You will save ₹{MrpPrice - total} on this order</p>
          </div>


        </div>
        
        </div>
      }
     
    </>
  )
}

export default Cart