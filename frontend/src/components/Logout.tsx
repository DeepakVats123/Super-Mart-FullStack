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

  
  function Logout() {
    const dispatch = useDispatch()
    const userDetails = useSelector((state: any) => state.userDetails)
    const userNameFromLocalStorage: any = localStorage.getItem("superMart-user")
    


    const logOutUserFromApi =  ()=>{
      dispatch(logoutUser(false))
      localStorage.clear()
    }
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:bg-blue-500 text ml-3 -mr-2" variant="outline"><User className="mr-2 h-4 w-4" /> {userDetails.fullName || JSON.parse(userNameFromLocalStorage)}</Button>
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
  