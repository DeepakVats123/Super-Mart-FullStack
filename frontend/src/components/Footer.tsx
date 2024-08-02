import Image from 'next/image'
import React from 'react'
import paymentMethodImg from '../../public/payment-method.svg'
import slogo from '../../public/s-log.png'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='mt-10 dark:bg-slate-800 bg-slate-800 p-10 text-white'>
        {/* <Image src={paymentMethodImg} alt='payment' /> */}
        <div className='flex items-center justify-center'>
            <Image className='w-8' src={slogo} alt='Logo' />
            <span className='font-bold text-xl m-2'>Super Mart</span>
        </div>

        <div className='grid sm:grid-cols-4 grid-cols-2 sm:px-10 gap-10 px-5 text-center mt-10'>
            <div className='text-left text-sm'>
                <h3 className='font-bold text-xl underline mb-2'>MEN</h3>
                <p><Link href={'#'}>Clothing</Link></p>
                <p><Link href={'#'}>Travel</Link></p>
                <p><Link href={'#'}>Causual</Link></p>
                <p><Link href={'#'}>Party</Link></p>
                <p><Link href={'#'}>Indian Wear</Link></p>
                <p><Link href={'#'}>Western Wear</Link></p>
            </div>

            <div className='text-left text-sm'>
                <h3 className='font-bold text-xl underline mb-2'>WOMEN</h3>
                <p><Link href={'#'}>Clothing</Link></p>
                <p><Link href={'#'}>Indian Wear</Link></p>
                <p><Link href={'#'}>Western Wear</Link></p>
                <p><Link href={'#'}>Travel</Link></p>
                <p><Link href={'#'}>Causual</Link></p>
                <p><Link href={'#'}>Party</Link></p>
            </div>

            <div className='text-left text-sm'>
                <h3 className='font-bold text-xl underline mb-2'>RESOURCES</h3>
                <p><Link href={'#'}>Shadcn/UI</Link></p>
                <p><Link href={'#'}>Tailwind CSS</Link></p>
                <p><Link href={'#'}>Node.js</Link></p>
                
            </div>

            <div className='text-left text-sm'>
                <h3 className='font-bold text-xl underline mb-2'>FOLLOW US</h3>
                <p><Link href={'#'}>GitHub</Link></p>
                <p><Link href={'#'}>LinkedIm</Link></p>
                <p><Link href={'#'}>Twitter</Link></p>
               
            </div>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 mt-10 border-t-2 content-evenly py-5'>
            <div className='md:text-left text-center text-sm'>
                <p className='text-sm' >© 2024 Super Mart™. All Rights Reserved.</p>
                <p className='text-xs mb-3'>Terms of Use | Cookie & Privacy Policy</p>
            </div>
            <div className=''>
                <Image className='m-auto w-full'  src={paymentMethodImg} alt='payment-bar' />
            </div>
        </div>


    </div>
  )
}

export default Footer