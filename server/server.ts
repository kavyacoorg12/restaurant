import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './src/infrastructure/database/connectDB'
dotenv.config()
import cors from 'cors'
const app=express()
import restaurantRouter from './src/interface/route/restaurants'
import { errorMiddleware } from './src/interface/middleware/errorMiddleware'
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',restaurantRouter)
app.use(errorMiddleware)

async function startServer()
{
  try{
   await connectDB()
   app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
   })
  }catch(err)
  {
    console.log(err)
  }
}
startServer()
