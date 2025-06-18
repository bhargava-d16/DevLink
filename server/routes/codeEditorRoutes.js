const express=require("express");
const extractInfo = require("../controllers/codeeditorcontrollers/extractinfo");

const router=express.Router();

router.post("/extractinfo",extractInfo);

module.exports=router;