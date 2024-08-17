'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import slog from '../../../public/s-log.png'
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/baseURL';
import { useToast } from "@/components/ui/use-toast"


const CheckoutPage = () => {
  
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
    if (!data.pincode) {
      errors.pincode = "*Pincode required";
    }
    if (!data.phoneNumber) {
        errors.phoneNumber = "*Phone Number required";
    }
    if (!data.city) {
        errors.city = "*City required";
    }
    if (!data.state) {
        errors.state = "*State required";
    }
    if (!data.address) {
        errors.address = "*Address required";
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
   
  }

  return (
    <div>
    <div className='border-2 m-auto sm:p-10 p-4 mt-10 border-r-2 rounded-lg sm:w-[500px] w-[96%]' >
      <div className='text-center mb-5'>
        <Image className='w-16 m-auto' src={slog} alt='logo' />
        <span className='text-xs font-bold'>Super Mart</span>
        <h4>Checkout</h4>
      </div>
    <form onSubmit={submitForm}>
        

        <div className='flex gap-2'>

        <div>
            <label  htmlFor="fullName">Full Name</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='fullName' placeholder="your name" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.fullName}</p>
        </div>
        
        <div>
            <label   htmlFor="email">Email</label>
            <Input onChange={handleInput} className='mt-1' type="email" name='email' placeholder="email@company.com" />
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.password}</p>
        </div>
      </div>

      <div className='flex gap-2'>
        <div>
            <label  htmlFor="phoneNumber">Phone Number</label>
            <Input onChange={handleInput} className='mt-1' type="number" name='phoneNumber' placeholder="your number" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.email}</p>
        </div>
        <div>
            <label   htmlFor="pincode">Pincode</label>
            <Input onChange={handleInput} className='mt-1' type="number" name='pincode' placeholder="your pincode" />
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.password}</p>
        </div>
      </div>

      <div className='flex gap-2'>
        <div>
            <label  htmlFor="city">City</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='city' placeholder="your city" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.email}</p>
        </div>
        <div>
            <label   htmlFor="state">State</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='state' placeholder="your state" />
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.password}</p>
        </div>
        </div>

        <div>
            <label  htmlFor="address">Address (area & street)</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='address' placeholder="your full address" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.fullName}</p>
        </div>

        <div className='flex justify-center items-center gap-4'>
            <div><Input type='radio' checked={true}/></div>
            <div><span>Only Cash on delivery avilable.</span></div>
             
        </div>

        <div className='text-center'>
            <Button className="text-lg align-middle border-slate-500 bg-orange-600 text-white font-bold hover:bg-orange-500 rounded-md px-2 py-2" 
             disabled={btnDisable} variant={'outline'}
             onClick={submitForm}>Checkout Now</Button>
        </div>
      

      

      
      <br />
      
      <div className='text-center'>
      <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/cart'}>back to cart</Link>
      </div>
    </form>
    
    
    </div>
    </div>
  )
}

export default CheckoutPage
