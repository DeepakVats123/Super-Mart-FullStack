'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [tokenFromLS, setTokenFromLS] = useState<any>("");
  const navigate = useRouter();
  const lsOrders = useSelector((state: any) => state.ordersHistory) 
  
  if(tokenFromLS === null){
    navigate.push('/')
  }
  

  useEffect(()=>{
    const LsData: any = localStorage.getItem("superMart-orders")
    const lsToken: any = localStorage.getItem("superMart-token")
    const data = JSON.parse(LsData)
    const tkn = JSON.parse(lsToken)
    setOrders(data)
    setTokenFromLS(tkn)
  },[lsOrders])
  return (
    <>
      <div className='m-auto sm:w-[500px] w-[96%]'>
        <div className='m-5'>
          <h1 className='font-bold text-xl'>My Orders</h1>
        </div>

        <div className=''>
            { Array.isArray(orders) && orders.length > 0? orders.slice().reverse().map((order:any,ind)=>{
                return <div key={ind+1+"a"} className='flex border p-2 mb-2 items-center gap-5 rounded-lg justify-evenly sm:max-w-[500px]' >
                          <div className=''>
                              <div className='w-16'>
                                <img className='w-full' src={order.items[0].image_url} alt="" />
                              </div>    
                              <div className='border mt-1 w-16 text-center'>
                                  <p className='text-xs'>{order.items.length} {order.items.length > 1 ? "items" : "item"}</p>
                              </div>
                          </div>
                          
                          <div>
                            <span className='font-bold text-gray-600 text-lg hidden md:inline'>Order Total</span> <br /> <span className='font-bold text-lg'>Rs. {order.order_total}</span>
                          </div>
                          
                          <div>
                            <span className='text-gray-600 text-xs'>Date-{order.date}</span> <br /> <span className='text-gray-600 text-xs'>{order.time}</span>
                          </div>

                      </div>
            })
            : <div>{"You don't have any order history"}</div>
          }
        </div>
      </div>
    </>
  )
}

export default Orders