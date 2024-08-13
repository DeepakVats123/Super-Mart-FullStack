"use client"
import React, { useState } from 'react'
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import Filters from '@/components/Filters';
import useFetch from '@/utils/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '@/constants/baseURL';
import { addToCart } from '@/redux/features/userSlice';
import { useToast } from '@/components/ui/use-toast';




const MenProductsPage = () => {

  const [sorting, setsorting] = useState<any>(()=>()=>()=>{})
  const products = useFetch('/products/men')
  const storeData: any = useSelector((state: any)=> state.authToken)
  const tokenFromLS: any = localStorage.getItem("superMart-token")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const {toast} = useToast()

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
    <div>
      
      <Filters setsorting={setsorting}  />

    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5 gap-5'>
      {
      !products.length ? [1,2,3,4,5].map((e: any) => {
        return <ProductCardSkeleton key={e+"a"} />
      })
      :
      products.sort(sorting).map((e: any) => {
        return <ProductCard key={e._id} details={e} path={'/men'} authToken={storeData || JSON.parse(tokenFromLS)} addToCartFn={addToCartFn} loading={loading} />
      })
      } 
    </div>
    </div>
  )
}

export default MenProductsPage