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
            console.log("Login Reducer Called")
            console.log("Payload: ",action.payload)
            localStorage.setItem('superMart-token',JSON.stringify(action.payload.data.accessToken))
            localStorage.setItem('superMart-user',JSON.stringify(action.payload.data.user.fullName))
            state.authToken = action.payload.data.accessToken
            state.authStatus = true
            state.userDetails = action.payload.data.user
            
        },

        logoutUser : (state, action) => {
           state.authToken = ""
            state.userDetails= {}
            state.authStatus = action.payload
        },
    }
})

export const {loginUser,logoutUser} = userSlice.actions
export default userSlice.reducer