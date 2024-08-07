"use client"
import Navbar from '@/components/Navbar'
import ProductDetails from '@/components/ProductDetails'
import useFetch from '@/utils/useFetch'


import React from 'react'

const ProductPage = ({searchParams}: any) => {
    const data: any =  useFetch(`/products/get-Product?id=${searchParams.id}`)
    console.log(data)
    
  return (
    <>
    <Navbar />
    <ProductDetails ProductData={data}  />
    
    
    </>
  )
}

export default ProductPage