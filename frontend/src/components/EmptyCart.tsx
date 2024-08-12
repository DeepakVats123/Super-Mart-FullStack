import React from 'react'

const EmptyCart = () => {
  return (
    <div>
      <div className='text-center p-20'>
        <div >
        <img className='m-auto w-[200px] mb-5' src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
        </div>
      
      <h1 className='text-2xl font-bold'>Your cart is empty!</h1>
      <p className='text-xs'>Explore our wide selection and find something you like.</p>
      </div>
    </div>
  )
}

export default EmptyCart