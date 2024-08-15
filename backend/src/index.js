import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config(
    {
        path: './env'
    }
)


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is running at port ${process.env.PORT || 8000}`)
    })
})
.catch((error) => {
    console.log("mongoDB connection failed !!",error)
})