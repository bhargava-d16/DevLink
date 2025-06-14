require("dotenv").config();

const express=require("express");
const app=express();
const cors = require('cors');
const PORT=process.env.PORT || 8080;
const bodyParser=require('body-parser');
const { connectDB } = require("./libs/db");
// const router =require("./routes/authRoutes")
const Authroutes =require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const messageRoutes = require("./routes/messageroutes");


const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB()
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};
startServer();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use("/api",Authroutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})