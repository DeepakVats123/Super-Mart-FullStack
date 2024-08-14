import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


const app = express();

app.use(cors())
 
// app.use(cors({
//     origin : process.env.CORS_ORIGIN,
//     credentials : true
// }))

app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({extended : true, limit : "32kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// import routes here
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"


// routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)


export {app};