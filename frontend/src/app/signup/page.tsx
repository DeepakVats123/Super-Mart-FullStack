'use client'
import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import slog from '../../../public/s-log.png'


const SignUpPage = () => {
  return (
    <div className='border-2 m-auto  p-10 mt-10 border-r-2 rounded-lg sm:w-96 w-80' >
      <div className='text-center mb-5'>
        <Image className='w-16 m-auto' src={slog} alt='logo' />
        <span className='text-xs font-bold'>Super Mart</span>
      </div>
    <form >
    
      <label htmlFor="Name">Name</label>
      <Input className='mb-5' type="text" placeholder="write your name here" />

      <label htmlFor="email">Email</label>
      <Input className='mb-5' type="email" placeholder="write your email here" />

      <label  htmlFor="password">Password</label>
      <Input type="password" placeholder="write your password here" />

      <Button className='mt-5 h-9 font-bold bg-blue-600'>Sign Up</Button>
      <br />
      <div className='text-center mt-5'>
      <span >Already an user ? <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/login'}>Login</Link></span>
      </div>
    </form>
    </div>
  )
}

export default SignUpPage