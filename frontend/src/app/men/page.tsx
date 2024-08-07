"use client"
import React, { useState } from 'react'
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import Navbar from '@/components/Navbar';
import Filters from '@/components/Filters';
import useFetch from '@/utils/useFetch';




const MenProductsPage = () => {

  const [sorting, setsorting] = useState<any>(()=>()=>()=>{})
  const products = useFetch('/products/men')

  return (
    <div>
      <Navbar />
      <Filters setsorting={setsorting}  />

    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5 gap-5'>
      {
      !products.length ? [1,2,3,4,5].map((e: any) => {
        return <ProductCardSkeleton />
      })
      :
      products.sort(sorting).map((e: any) => {
        return <ProductCard key={e._id} details={e} path={'/men'} />
      })
      } 
    </div>
    </div>
  )
}

export default MenProductsPage