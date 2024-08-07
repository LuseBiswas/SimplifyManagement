import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import taskRoute from "./routes/manage.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT||5001;
const mongoLink=process.env.LINK||"mongodb+srv://riteshbiswas:riteshbiswas@generaluse.sshpglb.mongodb.net/taskDB";



app.use(cors( {origin: ['http://localhost:5173']}));

mongoose.connect(mongoLink, {useNewUrlParser: true});

app.use("/api/auth",authRoute);
app.use("/api/task",taskRoute);

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});