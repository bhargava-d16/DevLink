const express=require("express");
const protectRoute = require("../middlewares/auth");
const getUsers = require("../controllers/msgcontrollers/getusers");
const getMessage = require("../controllers/msgcontrollers/getmessages");
const sendMessage = require("../controllers/msgcontrollers/sendMessage");

const router= express.Router();

router.get("/users",protectRoute,getUsers);

router.get("/:id",protectRoute,getMessage);

router.post("/send:id",protectRoute,sendMessage)

module.exports=router