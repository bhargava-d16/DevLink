require("dotenv").config();

const express=require("express");

const cors = require('cors');
const PORT=process.env.PORT || 8080;
const bodyParser=require('body-parser');
const { connectDB } = require("./libs/db");
const Authroutes =require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const messageRoutes = require("./routes/messageroutes");
const codeEditorRoutes = require("./routes/codeEditorRoutes");
const {app,io,server}=require("./libs/socket")

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


app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use("/api",Authroutes)
app.use("/api/message",messageRoutes)
app.use("/api",codeEditorRoutes);

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})