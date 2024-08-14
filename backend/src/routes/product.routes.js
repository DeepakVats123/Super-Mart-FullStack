import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProductsList, addProductsToDB, deleteAllProducts, getAllProducts, getMenData, getProductByID, getWomenData, searchProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(verifyJWT, addProductsToDB)
router.route("/add-products-list").post(verifyJWT, addProductsList)
router.route("/delete-products-list").post(verifyJWT, deleteAllProducts)
router.route("/get-Products").get(getAllProducts)
router.route("/get-Product").get(getProductByID)
router.route("/men").get(getMenData)
router.route("/women").get(getWomenData)
router.route("/search").get(searchProduct)

export default router