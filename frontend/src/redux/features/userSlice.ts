import { BASE_URL } from "@/constants/baseURL";
import { createSlice } from "@reduxjs/toolkit";

interface user {
    authStatus: Boolean | null,
    authToken: String,
    userDetails: {},
    cartData: [],
    orderHistory: [] 
}

const initialState: user = {
    authStatus: null,
    authToken: "",
    userDetails: {},
    cartData: [],
    orderHistory: []
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser : (state, action) => {
            console.log("Payload: ",action.payload)
            localStorage.setItem('superMart-user',JSON.stringify(action.payload.data.user.fullName))
            localStorage.setItem('superMart-token',JSON.stringify(action.payload.data.accessToken))
            localStorage.setItem("cartItems", JSON.stringify(action.payload.data.user.cartItems))
            state.authToken = action.payload.data.accessToken
            state.authStatus = true
            state.userDetails = action.payload.data.user
            
        },
        logoutUser : (state, action) => {
            console.log(action.payload);
             fetch(`${BASE_URL}/users/logout`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': `Bearer ${action.payload}`,
                },
                body: JSON.stringify({})
            })
            .then(res => res.json())
            .then((res2) => {
                console.log(res2)
               })
            .catch(err=> console.log(err))
            localStorage.clear()
            state.authToken = ""
            state.userDetails= {}
            state.authStatus = false
        },
        addToCart : (state, action) => {
            console.log(action.payload);
            localStorage.setItem("cartItems", JSON.stringify(action.payload))
            state.cartData = action.payload
        },
        incCartItem : (state, action) => {
            console.log("action.payload", action.payload);
            localStorage.setItem("cartItems", JSON.stringify(action.payload))
            state.cartData = action.payload
        },
        decCartItem : (state, action) => {
            console.log("action.payload", action.payload);
            localStorage.setItem("cartItems", JSON.stringify(action.payload))
            state.cartData = action.payload
        },
        deleteCartItem : (state, action) => {
            console.log("action.payload", action.payload);
            localStorage.setItem("cartItems", JSON.stringify(action.payload))
            state.cartData = action.payload
        }
    }
})

export const {loginUser,logoutUser,addToCart,incCartItem,decCartItem,deleteCartItem} = userSlice.actions
export default userSlice.reducer