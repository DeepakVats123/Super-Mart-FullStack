'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import slog from '../../../public/s-log.png'
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/baseURL';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from '@/components/ui/toaster';




const SignUpPage = () => {
  
  const [formData, setFormData] = useState({})
  const [apiResponse, setApiResponse] = useState<any>({})
  const [btnDisable, setBtnDisable] = useState(false)
  const [navigateTo, setNavigateTo] = useState(false)
  const [errorsList, setErrorsList] = useState<any>({});

  const { toast } = useToast();

  const router = useRouter();
  const handleNavigation = () => {
    router.push('/login');
  };

  if(navigateTo){
    handleNavigation()
  }

  const handleInput = (e: any) =>{
      setFormData(((prevData: any)=>{
        return {...prevData, [e.target.name] : e.target.value}
      }))
  }


  const validateSignIn = (data: any) => {
    const errors: any = {};
    if (!data.fullName || data.fullName.length < 4) {
      errors.fullName = "*Fullname required (must have 3 letters)";
    }
    if (!data.email || !data.email.includes("@") || data.email.length < 7) {
      errors.email = "*Please add a valid email address";
    }
    if (!data.password || data.password.length < 8) {
      errors.password = "*Password required (must have 8 letters)";
    }
    setErrorsList(errors);
    return errors;
  };

  async function submitForm(e:any) {
    e.preventDefault()

    const isValid = validateSignIn(formData);
    console.log(isValid);
    if (Object.keys(isValid).length) return;

    setBtnDisable(true)
    const url = `${BASE_URL}/users/register`
    try {
      const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
          
        } 
      );
      const result = await response.json();
      console.log("Success:", result);
      setApiResponse(result)
      if(result.statusCode === 200){
        toast({
          title: result.message,
          description: "Please login with this email.",
        })
      }else{
        toast({
          title: result.message,
          description: "Please try with different email address.",
        })
      }
      
      setTimeout(() => {
          setBtnDisable(false)
          setApiResponse({})
          if(result.statusCode === 200){
            setNavigateTo(true)
          }
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      setBtnDisable(false)
    }
  }

  return (
    <div>
      <Navbar status='hidden' />
    <div className='border-2 m-auto  p-10 mt-10 border-r-2 rounded-lg sm:w-[500px] w-80' >
      <div className='text-center mb-5'>
        <Image className='w-16 m-auto' src={slog} alt='logo' />
        <span className='text-xs font-bold'>Super Mart</span>
      </div>
    <form onSubmit={submitForm}>
    
      <label  htmlFor="fullName">Full Name</label>
      <Input onChange={handleInput} className='mt-1' type="text" name='fullName' placeholder="write your name here" />
      <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.fullName}</p>

      <label  htmlFor="email">Email</label>
      <Input onChange={handleInput} className='mt-1' type="email" name='email' placeholder="write your email here" />
      <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.email}</p>

      <label   htmlFor="password">Password</label>
      <Input onChange={handleInput} className='mt-1' type="password" name='password' placeholder="write your password here" />
      <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.password}</p>

      <Button className='h-8 align-middle border-black hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:border-white dark:hover:bg-white' disabled={btnDisable} variant={'outline'}>Sign Up</Button>
      <br />
      
      <div className='text-center mt-5'>
      <span >Already an user ? <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/login'}>Login</Link></span>
      </div>
    </form>
    
    
    </div>
    </div>
  )
}

export default SignUpPage