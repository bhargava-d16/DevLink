const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch{
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports=checkAuth;