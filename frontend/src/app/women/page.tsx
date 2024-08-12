"use client"
import React, { useState } from 'react'
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import Filters from '@/components/Filters';
import useFetch from '@/utils/useFetch';
import { addToCart } from '@/redux/features/userSlice';
import { BASE_URL } from '@/constants/baseURL';
import { useDispatch, useSelector } from 'react-redux';



const WomenProductsPage = () => {
  const [sorting, setsorting] = useState<any>(()=>()=>(a:any,b:any)=>{})
  const products = useFetch('/products/women')
  const storeData: any = useSelector((state: any)=> state.authToken)
  const tokenFromLS: any = localStorage.getItem("superMart-token")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  function addToCartFn(product: any, token: String){
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
      
      <Filters setsorting={setsorting} />

    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5 p-5 gap-5'>
      {
      !products.length ? [1,2,3,4,5].map((e: any) => {
        return <ProductCardSkeleton />
      })
      :
      products && Array.isArray(products) && products.sort(sorting).map((e: any) => {
        return <ProductCard key={e._id} details={e} path={'/women'} authToken={storeData || JSON.parse(tokenFromLS)} addToCartFn={addToCartFn} loading={loading} />
      })
      }
    </div>
  </>
  )
}

export default WomenProductsPage