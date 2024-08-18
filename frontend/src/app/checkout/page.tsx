'use client'
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import slog from '../../../public/s-log.png'
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/baseURL';
import { useToast } from "@/components/ui/use-toast"
import { useDispatch, useSelector } from 'react-redux';
import { orderNow } from '@/redux/features/userSlice';


const CheckoutPage = () => {

    const [lsCartData,setLsCartData] = useState<any>(null)
    const [tokenFromLS, setTokenFromLS] = useState<any>("")
    const storeData = useSelector((state: any) => state)
    let cartData = storeData.cartData.length? storeData.cartData : JSON.parse(lsCartData) 
  
    const dispatch = useDispatch()
  
    const total = Array.isArray(cartData) ? cartData.reduce((acc: any, e:any)=> acc + (e.price * e.quantity), 0) : 0
    const MrpPrice = Array.isArray(cartData) ? cartData.reduce((acc: any, e:any)=> acc + (Number(e.strikedoffprice) * e.quantity), 0) : 0
    const cartItemsCount = Array.isArray(cartData) ? cartData.reduce((acc, product)=>{
       return acc + (product.quantity)
    },0)
    : 0;
  
  const [formData, setFormData] = useState({})
  const [btnDisable, setBtnDisable] = useState(false)
  const [navigateTo, setNavigateTo] = useState(false)
  const [errorsList, setErrorsList] = useState<any>({});
  const [loading, setLoading] = useState(false)

  const { toast } = useToast();

  const router = useRouter();
  const handleNavigation = () => {
    router.push('/');
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
      errors.fullName = "*Required (must have 3 letters)";
    }
    if (!data.email || !data.email.includes("@") || data.email.length < 7) {
      errors.email = "*Add a valid email address";
    }
    if (!data.pincode || data.pincode.length < 6) {
      errors.pincode = "*Required (must have 6 digits)";
    }
    if (!data.phoneNumber || data.phoneNumber.length < 10) {
        errors.phoneNumber = "Required (must have 10 digits)";
    }
    if (!data.city || data.city.length < 3) {
        errors.city = "*Required (must have 3 letters)";
    }
    if (!data.state || data.state.length < 2) {
        errors.state = "*Required (must have 2 letters)";
    }
    if (!data.address || data.address.length < 6) {
        errors.address = "*Address required";
    }
    setErrorsList(errors);
    return errors;
  };

  function deleteAllCartItems(){
    fetch(`${BASE_URL}/users/cart/delete-all`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(tokenFromLS)}`,
      },
      body: JSON.stringify({})
      })
        .then(res => res.json())
        .then((res2) => {
            console.log(res2)
          })
        .catch(err=> console.log(err))
  }

  async function submitForm(e:any) {
    e.preventDefault()
    const isValid = validateSignIn(formData);
    if (Object.keys(isValid).length) return;
    
    console.log(JSON.parse(tokenFromLS));
    setBtnDisable(true)

    const url = `${BASE_URL}/users/order`
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({items: cartData,order_total: total, address: formData}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(tokenFromLS)}`,
        }
      })
      const res2 = await res.json()
      console.log(res2)
      dispatch(orderNow(res2.data))
      setLoading(false)
      setBtnDisable(false)
      setNavigateTo(true)
      deleteAllCartItems()
      
    } catch (error) {
      console.log("OrderApiError", error) 
    //   setLoading(false)
    //   setBtnDisable(true)
    }
}


  useEffect(()=>{
    setLsCartData(localStorage.getItem("cartItems"))
    setTokenFromLS(localStorage.getItem("superMart-token"))
  },[storeData])

  return (
    <>
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
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.email}</p>
        </div>
      </div>

      <div className='flex gap-2'>
        <div>
            <label  htmlFor="phoneNumber">Phone Number</label>
            <Input onChange={handleInput} className='mt-1' type="number" name='phoneNumber' placeholder="your number" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.phoneNumber}</p>
        </div>
        <div>
            <label   htmlFor="pincode">Pincode</label>
            <Input onChange={handleInput} className='mt-1' type="number" name='pincode' placeholder="your pincode" />
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.pincode}</p>
        </div>
      </div>

      <div className='flex gap-2'>
        <div>
            <label  htmlFor="city">City</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='city' placeholder="your city" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.city}</p>
        </div>
        <div>
            <label   htmlFor="state">State</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='state' placeholder="your state" />
            <p className='text-red-500 text-xs mb-6 mt-1 ml-2'>{errorsList.state}</p>
        </div>
        </div>

        <div>
            <label  htmlFor="address">Address (area & street)</label>
            <Input onChange={handleInput} className='mt-1' type="text" name='address' placeholder="your full address" />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.address}</p>
        </div>

        <div>
            <label  htmlFor="Total">Payble Amount</label>
            <Input disabled onChange={handleInput} className='mt-1' type="text" name='address' placeholder={`${total-100}`} />
            <p className='text-red-500 text-xs mb-5 mt-1 ml-2'>{errorsList.address}</p>
        </div>


        <div className='flex justify-center items-center gap-4'>
            <div><Input type='radio' checked={true}/></div>
            <div><span>Only Cash on delivery avilable.</span></div>
             
        </div>

        <div className='text-center'>
            <Button className="text-lg align-middle border-slate-500 bg-orange-600 text-white font-bold hover:bg-orange-500 rounded-md px-2 py-2" 
             disabled={btnDisable} variant={'outline'}
             onClick={submitForm}>Order Now</Button>
        </div>
      

      

      
      <br />
      
      <div className='text-center'>
      <Link className='text-blue-500 font-semibold hover:text-blue-700' href={'/cart'}>back to cart</Link>
      </div>
    </form>
    
    
    </div>
    </>
  )
}

export default CheckoutPage
