'use client'
import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

import Link from 'next/link';


const Login = () => {
  return (
    <div className='border-2 m-auto p-5 mt-10 border-r-2 rounded-lg sm:w-96 w-80' >
    <form >
      <label htmlFor="email">Email</label>
      <Input className='mb-5' type="email" placeholder="write your email here" />

      <label  htmlFor="password">Password</label>
      <Input type="password" placeholder="write your password here" />

      <Button className='mt-5 h-9 font-bold'>Log In</Button>
      <br />
      <div className='text-center mt-5'>
      <span >Create new account ? <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/signup'}>Sign Up</Link></span>
      </div>
    </form>
    </div>
  )
}

export default Login