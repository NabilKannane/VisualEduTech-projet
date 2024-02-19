const express=require("express");

const {login,token,logout ,register}=require("../controllers/authController")

const router = express.Router()


// les routes

router.post("/login", (req,res)=>login(req,res))
router.post("/register", (req,res)=>register(req,res))
router.post("/token", (req,res)=>token(req,res))
router.delete("/logout", (req,res)=>logout(req,res))

module.exports=router