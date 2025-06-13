require("dotenv").config();

const express=require("express");
const app=express();
const cors = require('cors');
const PORT=process.env.PORT || 8080;
const bodyParser=require('body-parser');
const { connectDB } = require("./utils/db");
const registerUser = require("./controllers/signUp");
const loginUser = require("./controllers/login");
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
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.post("/api/signUp",registerUser)
app.post("/api/login",loginUser) 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})