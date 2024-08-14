import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'; 
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";



const generateRefreshAndAccessToken = async (userID) => {
   try {
     const user = await User.findById(userID)
     const refreshToken = user.genrateRefreshToken()
     const accessToken = user.genrateAccessToken()
 
     user.refreshToken = refreshToken
     await user.save({validateBeforeSave: false})
 
     return {refreshToken, accessToken}

   } catch (error) {
        throw new ApiError(401, "tokens not generated.")
   }
}

const registerUser = asyncHandler(async function(req,res){
    // get data from body
    // check for empty fields
    // check for user already exist bu email, if exist throw err
    // create user
    // check user is created or not, if created remove password and refresh token 
    // and send response

    const {fullName,email,password} = req.body

    if([fullName,email,password].some((field) => field?.trim() === "")){
        throw new ApiError(401, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if(existedUser){
        res.status(201)
        .json(new ApiResponse(201,{},"User already registerd with this email !!")) 
    }

    const user = await User.create(
        {
            fullName,
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(403, "Somethig wrong while registring the user.")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User registerd successfully")
    )

    
})

const loginUser = asyncHandler(async function(req, res){
    // get data from frontend{body}
    // check for every field is coming
    // find user by email, if not throw error
    // check for password is correct, if not throw error
    // genrate access & refresh token
    // send response 

    const {email, password} = req.body

    if([email, password].some((field) => field?.trim === "")){
        res.status(401)
        .json(
            new ApiResponse(401,{}, "All fields are required.")
        )
    }
    
    const user = await User.findOne({email})
    
    if(!user){
       res.status(401)
       .json(
        new ApiResponse(401, {}, "User not found or invalid credentials.")
       ) 
    }

    const isPassCorrect = await user.isPasswordCorrect(password)
    

    if(!isPassCorrect){
         res.status(401)
        .json(
            new ApiResponse(401, {}, "Incorrect password or invalid credentials.")
        )
    }

    const {refreshToken, accessToken} = await generateRefreshAndAccessToken(user._id)
    
   const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   const options = {httpOnly : true, secure: true}

    return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            , "User logged in sussessfully")
    )

})

const logout = asyncHandler(async function(req,res){
    // const {userID} = req.body || req.user._id
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $unset : {
            refreshToken : 1
          }  
        },
        {
            new: true
        }  
    )

    const options = {httpOnly : true, secure: true}

    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
        new ApiResponse(200,"","User Logged out succesfully")
    )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    // console.log("inc TOKEN", incomingRefreshToken);

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }
    
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
    
    const user = await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(401, "Invalid user Token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(402, "Invalid user Token")
    }

    const {refreshToken, accessToken} = await generateRefreshAndAccessToken(user?._id)

    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
       new ApiResponse(200, {accessToken, refreshToken}, "Refresh Token refreshed")
    )
})

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    )

    if(!user){
        throw new ApiError(401, "Something went wrong while fetching user profile")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"User Profile fetched")
    )
})

const ordersHistory = asyncHandler(async (req, res) => {
    const order = req.body
    const {items, order_total, address } = order

    const user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    )
    if(!user){
        throw new ApiError(401, "user not found")
    }

    if(typeof items !== typeof [] || items.length === 0 || typeof order_total !== "number" || typeof address !== "string"){
        throw new ApiError(401, "Order data should be in format!! \n items = [],orderTotal = Number, address = String" )
    }

    user.ordersHistory = [...user.ordersHistory, order]
    user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, user.ordersHistory ,"ordered successfully")
    )
})

const addToCart = asyncHandler(async (req, res) => {
   const {cartData, userID} = req.body
   const USER_ID = req.user._id || userID

   const user = await User.findById(USER_ID).select(
    "-password -refreshToken"
   )

   if(!user){
    throw new ApiError(401, "You are not authorized")
   }
   let cart_Items = user.cartItems

   const existingItem = cart_Items.find((item) => item._id === cartData._id)

   if(existingItem){
       const Items = cart_Items.map((e) => {
           return e._id === cartData._id ? {...e, quantity: e.quantity + 1}: e
       })
       user.cartItems = Items
       user.save({validateBeforeSave: false})
    }
   else{
    user.cartItems = [...user.cartItems, cartData]
    await user.save({validateBeforeSave: false})
   }

   
  

   return res
   .status(200)
   .json(
    new ApiResponse(200, user.cartItems, "Item added to cart successfully")
   )


})

const IncreseCartItem = asyncHandler(async (req, res)=>{
    const {item, userID} = req.body
   const USER_ID = req.user._id || userID

    if(typeof item !== "object"){
        throw new ApiError(401, "data not found or not an Object")
     }

     const user = await User.findById(USER_ID).select(
        "-password -refreshToken"
     )

     if(!user){
        throw new ApiError(401, "You are not authorized")
     }

    let cart_Items = user.cartItems
    const Items = cart_Items.map((e) => {
        return e._id === item._id ? {...e, quantity: e.quantity + 1} : e
    })

    user.cartItems = Items
    const updatedItems = await user.save({validateBeforeSave: false})
    
    return res
    .status(200)
    .json(
        new ApiResponse(201,updatedItems.cartItems,"Quantity increase successfully !!")
    )

})

const DecreseCartItem = asyncHandler(async (req, res)=>{
    const {item, userID} = req.body
    console.log(req.body);
    const USER_ID = req.user._id || userID

    if(typeof item !== "object"){
        throw new ApiError(401, "data not found or not an Object")
     }


     const user = await User.findById(USER_ID).select(
        "-password -refreshToken"
     )

     if(!user){
        throw new ApiError(401, "You are not authorized")
     }

    if(item.quantity === 1){
        return res
        .status(201)
        .json(
            new ApiResponse(201, user.cartItems, "Cannot decrease item only 1 left")
        )
    }
    else{
        let cart_Items = user.cartItems
    const Items = cart_Items.map((e) => {
        return e._id === item._id ? {...e, quantity: e.quantity - 1}: e
    })

    user.cartItems = Items
    const updatedItems = await user.save({validateBeforeSave: false})
    
    return res
    .status(200)
    .json(
        new ApiResponse(201,updatedItems.cartItems,"Quantity increase successfully !!")
    )

    }
    

    
})

const deleteCartItems = asyncHandler(async (req, res) => {

    const {item, userID} = req.body
    const USER_ID = req.user._id || userID

    if(typeof item !== "object"){
        throw new ApiError(401, "data not found or not an Object")
     }

    const user = await User.findById(USER_ID).select(
        "-password -refreshToken"
    )

    if(!user){
        throw new ApiError(401, "You are not authorized")
    }

    user.cartItems = user.cartItems.filter((e) => {
       return e._id !== item._id
    })
    const updatedData = await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(201, updatedData.cartItems, "Item deleted successfully !!")
    )
})

export {
    addToCart,
    IncreseCartItem,
    DecreseCartItem,
    deleteCartItems, 
    registerUser,
    ordersHistory,
    loginUser,
    logout,
    refreshAccessToken,
    getProfile}
