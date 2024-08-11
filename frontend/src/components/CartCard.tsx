import React from 'react'


const CartCard = ({data}: any) => {
   
  return (
    <div className=' flex border my-2'>
            <div className='w-[90px] sm:w-[120px]'>
                <img className='w-[90px] sm:w-[120px]' src={data.image_url} alt="" />
            </div>
            <div className='pl-3'>
                   <h4 className='text-lg font-bold text'>{data.brand}</h4> 
                   <p className='text-slate-600 text-sm'>{data.name}</p> 
                   <h2 className='font-bold text-xl'>₹{data.price}</h2>           
            </div>
    </div>
  )
}

export default CartCard