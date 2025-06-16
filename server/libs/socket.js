const {Server}=require("socket.io")
const http=require("http")
const express=require("express")

const app=express()

const server=http.createServer(app);

const io=newServer(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

io.on("Connection",(socket)=>{
    console.log("user connected")
})
export {io,app,server}