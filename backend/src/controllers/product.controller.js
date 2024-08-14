import {Product} from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { menData,womenData } from "../../data.js";

const addProductsToDB = asyncHandler(async (req, res) => {
        const productData =  req.body
        const {name,image_url,price,category,rating,strikedoffprice,popular, quantity} = productData
        
        if(!productData ){
            throw new ApiError(401, "data must be required in object formet")
        }
        const product = await Product.create(
            {
                name,
                image_url,
                brand,
                price,
                category,
                rating,
                strikedoffprice,
                popular,
                quantity
            }
        )

        const createdProduct = await Product.findById(product._id)

        if(!createdProduct){
            throw new ApiError(401, "something went wrong while creating product")
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(201, createdProduct, "Product added successfully")
        )
})

const deleteAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.deleteMany({})

    return res
    .status(200)
    .json(
        new ApiResponse(201,result,"Delete all products successfully")
    )
}) 

const addProductsList = asyncHandler(async (req, res) => {
    const productData =  req.body

    if(productData.length === 0 || productData.length === undefined){
        throw new ApiError(401, "Data is not coming or data should be an array")
    }

    // for insert many products in on go
    const updatedProductsList = await Product.insertMany(productData)

    // const updateManyProducts = await Product.updateMany(
    //     {},
    //     {
    //         $set: {category: "women"}
    //     }
    //    )

   const allProducts = await Product.find({})
    
    return res
    .status(200)
    .json(
        new ApiResponse(201, allProducts, "Products List added successfully")
    )
})

const getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({})

    if(!allProducts){
        throw new ApiError(401, "something went wrong while fetching products")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, allProducts,"All products fetched successfully!")
    )
})

const getProductByID = asyncHandler(async (req, res) => {

    console.log("/n iiiiiidddddddddddddddd",req.query.id)
    const product = await Product.findById(req.query.id)

    if(!product){
        throw new ApiError(401, "something went wrong while fetching product")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201,product,"Product fetched successfully!")
    )
})

const getMenData = asyncHandler(async (req, res) => {
    const menProducts = await Product.find({category: "men"})
    console.log("Men--",menProducts.length)
    if(!menProducts){
        throw new ApiError("somthing went wrong while fething")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201,menProducts,"Men's products fetched successfully !!")
    )
})

const getWomenData = asyncHandler(async (req, res) => {
    const womenProducts = await Product.find({category: "women"})
    
    if(!womenProducts){
        throw new ApiError("somthing went wrong while fething")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201,womenProducts,"Women's products fetched successfully !!")
    )
})

const searchProduct = asyncHandler(async (req, res) => {
    const result = await Product.aggregate(
        [
            {
              $search: {
                index: "search-text",
                text: {
                  query: req.query.text,
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
            
        ]
    )

    return res
    .status(200)
    .json(
        new ApiResponse(201,result,"search successfully !!")
    )
})

export {
    addProductsToDB,
    addProductsList,
    getAllProducts,
    getProductByID,
    deleteAllProducts,
    getMenData,
    getWomenData,
    searchProduct
}