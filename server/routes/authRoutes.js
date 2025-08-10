const express = require("express");
const registerUser = require("../controllers/authcontrollers/signUp");
const loginUser = require("../controllers/authcontrollers/login");
const logout = require("../controllers/authcontrollers/logout");
const protectRoute = require("../middlewares/auth");
const updateProfile = require("../controllers/authcontrollers/updateProfile");
const checkAuth = require("../controllers/authcontrollers/checkAuth");
const updateUsername = require("../controllers/authcontrollers/updateUsername");
const updateEmail = require("../controllers/authcontrollers/updateEmail");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/logout",logout)

router.put("/update-profile",protectRoute,updateProfile)

router.put("/update-username",protectRoute,updateUsername)

router.put("/update-email",protectRoute,updateEmail)

router.get("/check",protectRoute,checkAuth);
module.exports = router;
