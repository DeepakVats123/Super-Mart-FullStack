"use client"
import React, { useEffect, useState } from 'react'
import useFetch from '@/utils/useFetch'
import ProductDetails from '@/components/ProductDetails'

const page = ({params}: any) => {
  const data: any =  useFetch(`/products/get-Product?id=${params.product}`)
  console.log(data)
  
  return (
    <>
        <ProductDetails ProductData={data} />
    </>
  )
}

export default page