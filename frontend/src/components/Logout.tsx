"use client"
import {
    CreditCard,
    Github,
    LifeBuoy,
    LogOut,
    User,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "@/redux/features/userSlice"
import { useToast } from "./ui/use-toast"
import { useEffect, useState } from "react"


  
  function Logout({setLsCartData,setTokenFromLS}: any) {
    const dispatch = useDispatch()
    const storeData = useSelector((state: any) => state.authToken)
    const userfullName = useSelector((state: any) => state.userDetails.fullName)
    const [lsUserData, setLsUserData] = useState<any>(null)
    const {toast}: any = useToast()

    const Token = storeData
    const fullName = lsUserData? lsUserData.split(" ")[0] : ''


    const logOutUserFromApi =  ()=>{
      dispatch(logoutUser(Token))
      toast({
        title: "Logout successfully !!",
        description: "Thanks for visit Super-Mart !!"
      }) 
      setTokenFromLS(null)
      setLsCartData([])
    }

    useEffect(()=>{
      const userData: any = localStorage.getItem("superMart-user")
      const user: any = JSON.parse(userData)
      setLsUserData(user.fullName)
    },[])
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:bg-blue-500 px-1 sm:px-3 ml-1 sm:ml-3 -mr-2" variant="outline"><User className="mr-1 h-4 w-4" />{fullName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Orders</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>

          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          
          
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
         
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logOutUserFromApi}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  export default Logout
  