import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import userRoute from "./Route/userRoute.js"
import doctorRoute from "./Route/doctorRoute.js";
import  connectdb  from './Database/db.js';
const PORT=5000;
dotenv.config();
const app=express();

app.use(express.json());
connectdb();
app.use(cors());
app.use("/api",userRoute);
app.use("/api",doctorRoute);
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});