const jwt= require('jsonwebtoken')
const JWT_SECRET= "ThisIsMy$ecret"

const fetchUser= (req,res,next)=>{
    // Get the user from jwt token and add ID to req obj
    const token= req.header("auth-token")
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data= jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports= fetchUser