"use client"
import React, { cache, useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard';
import { BASE_URL } from '@/constants/baseURL';


const MenProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getData = () =>{
    fetch(`${BASE_URL}/products/men`)
    .then(res => res.json())
    .then(data => setProducts(data.data))
  }

  useEffect(()=>{
      getData()
  },[])


  
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5 p-5 gap-5'>
      {products && Array.isArray(products) && products.map((e: any) => {
        return <ProductCard key={e._id} details={e} />
      })
      }
      
    </div>
  )
}

export default MenProductsPage