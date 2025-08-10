const express = require("express");
const protectRoute = require("../middlewares/auth");
const getUsers = require("../controllers/msgcontrollers/getusers");
const getMessage = require("../controllers/msgcontrollers/getmessages");
const sendMessage = require("../controllers/msgcontrollers/sendMessage");
const searchUsers = require("../controllers/msgcontrollers/serachUsers");
const getChattedUsers = require("../controllers/msgcontrollers/getChattedUsers");

const router = express.Router();

router.get("/users", protectRoute, getUsers);

router.get("/search", protectRoute, searchUsers);

router.get("/chatted-users", protectRoute,getChattedUsers);

router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
