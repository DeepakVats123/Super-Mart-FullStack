'use client'
import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import slog from '../../../public/s-log.png'
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';


const Login = () => {
  return (
    <div>
      <Navbar status='hidden' />
    <div className='border-2 m-auto p-10 mt-10 border-r-2 rounded-lg sm:w-96 w-80' >
      <div className='text-center mb-5'>
        <Image className='w-16 m-auto' src={slog} alt='logo' />
        <span className='text-xs font-bold'>Super Mart</span>
      </div>
    <form >

      <label htmlFor="email">Email</label>
      <Input className='mb-5' type="email" placeholder="write your email here" />

      <label  htmlFor="password">Password</label>
      <Input type="password" placeholder="write your password here" />

      <Button className='mt-5 h-8 align-middle border-black hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:border-white dark:hover:bg-white' variant={'outline'}>Log In</Button>
      <br />
      <div className='text-center mt-5'>
      <span >Create new account ? <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/signup'}>Sign Up</Link></span>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login