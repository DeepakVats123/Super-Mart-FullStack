import React from "react";
import { Button } from "./ui/button";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { incCartItem, decCartItem, deleteCartItem } from '@/redux/features/userSlice'

const CartCard = ({ data, cartCardActionFn, token, method,loading }: any) => {
  return (
    <div className=" flex border my-2 w-full">
      <div className="w-[130px] sm:w-[140px] overflow-hidden">
        <img className="w-[130px] sm:w-[140px]" src={data.image_url} alt="" />
      </div>
      <div className="pl-3 w-full">
        <h4 className="text-xl font-bold text mt-1">{data.brand}</h4>
        <p className="text-slate-600 text-sm mb-1">{data.name}</p>

        <div>
        <span className='text-lg line-through text-slate-600 '>₹{data.strikedoffprice}</span>
        <span className='font-bold text-xl ml-2'>₹{data.price}</span>
        </div>

        <div className="items-center text-4xl mt-1 sm:mt-3">
          <Button
            className="h-7 align-middle border-slate-500 hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:hover:bg-white rounded-full px-2"
            variant={"outline"}
            disabled={loading}
            onClick={()=>{
              cartCardActionFn('users/cart/dec',{
                userID: "",
                item: data
              },
              token,
              decCartItem
            )
            }}
          >
            <FaMinus />
          </Button>
          <Button
            className="h-7 align-middle border-slate-500  font-bold   mx-1 w-12 hover:cursor-default"
            variant={"outline"}
          >
            {data.quantity}
          </Button>
          <Button
            className="h-7 align-middle border-slate-500 hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white dark:hover:bg-white rounded-full px-2"
            variant={"outline"}
            disabled={loading || data.quantity >= 10 ? true : false}
            onClick={()=>{
              cartCardActionFn('users/cart/inc',{
                userID: "",
                item: data
              },
              token,
              incCartItem
            )
            }}
          >
            <FaPlus />
          </Button>
          <Button
            className="h-7 align-middle border-slate-500 hover:bg-black hover:text-white font-bold dark:hover:text-black dark:hover:border-white  dark:hover:bg-white rounded-full ml-1 px-2"
            variant={"outline"}
            disabled={loading}
            onClick={()=>{
              cartCardActionFn('users/cart/delete',{
                userID: "",
                item: data
              },
              token,
              deleteCartItem
            )
            }}
          >
            <RiDeleteBin5Line />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
