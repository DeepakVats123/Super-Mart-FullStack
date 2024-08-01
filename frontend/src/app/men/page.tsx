"use client"
import React from 'react'
import { Button } from "@/components/ui/button";


const MenProductsPage = () => {
  function fireAlert(){
      alert("Hey I'm clicked")
  }
  return (
    <div className='text-center items-center m-5 border-2 border-blue-500'>
      <h1>Men Page</h1>
      <Button onClick={fireAlert} variant={'outline'}>Click me!</Button>
    </div>
  )
}

export default MenProductsPage