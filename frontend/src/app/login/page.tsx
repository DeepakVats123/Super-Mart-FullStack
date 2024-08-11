'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import slog from '../../../public/s-log.png'
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from '@/constants/baseURL';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/features/userSlice';


const Login = () => {
  const [loginData, setLoginData] = useState<any>({})
  const [errorsList, setErrorsList] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [isNavigate, setIsNavigate] = useState<any>(false);
  const {toast} = useToast();
  const navigate = useRouter();
  const dispatch = useDispatch()


  const handleInput = (e: any) =>{
      setLoginData((prev: any) =>{
        return {...prev, [e.target.name]: e.target.value}
      } )
  }

  const validateSignIn = (data: any) => {
    const errors: any = {};
    if (!data.email || !data.email.includes("@") || data.email.length < 7) {
      errors.email = "*Please add a valid email address";
    }
    if (!data.password || data.password.length < 8) {
      errors.password = "*Password required (must have 8 letters)";
    }
    setErrorsList(errors);
    return errors;
  };

   async function submitLoginForm(e:any) {
    e.preventDefault()
    
    const isValid = validateSignIn(loginData);
    console.log(isValid);
    if (Object.keys(isValid).length) return;

    setLoading(true)

    const url = `${BASE_URL}/users/login`
    // const url = "http://localhost:4000/api/v1/users/login"
    try {
      const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const result = await res.json();
    console.log("result:", result)
    if(result.statusCode === 200){
      toast({
        title: "Login Successfully !!",
        description: "Welcome to Super-Mart !!"
      })
      dispatch(loginUser(result))
      setIsNavigate(true)

    }
    else if(result.statusCode === 401){
      toast({
        title: result.message,
        description: "Please provide valid credentials !!"
      })
    }
    
    setTimeout(() => {
      setLoading(false)  
    }, 1000);

    } 
    catch (error) {
      console.log("Error:", error)
      setLoading(false)
    }

  }

  const handleNavigation = () =>{
    navigate.push('/')
  }

  if(isNavigate || localStorage.getItem('superMart-token')){
    handleNavigation()
  }

  return (
    <div>
    <div className='border-2 m-auto p-10 mt-10 border-r-2 rounded-lg sm:w-[500px] w-80' >
      <div className='text-center mb-5'>
        <Image className='w-16 m-auto' src={slog} alt='logo' />
        <span className='text-xs font-bold'>Super Mart</span>
      </div>

    <form onSubmit={submitLoginForm} >
      
      <label htmlFor="email">Email</label>
      <Input className='mt-1' onChange={handleInput} type="email" name='email' placeholder="write your email here" />
      <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.email}</p>

      <label  htmlFor="password">Password</label>
      <Input className='mt-1' onChange={handleInput} type="password" name='password' placeholder="write your password here" />
      <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.password}</p>

      <Button className='h-8 align-middle border-black hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:border-white dark:hover:bg-white' variant={'outline'} disabled={loading} >Log In</Button>
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