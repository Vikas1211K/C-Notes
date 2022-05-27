const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser= require('../middleware/fetchuser')

const JWT_SECRET= "ThisIsMy$ecret"
let success= false

//Route 1: Create a user using POST './api/auth/createUser'. No login req 
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be longer then 5 char').isLength({ min: 5 }),
], async (req, res) => {
  // console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success=false
      return res.status(400).json({success, error: "User with this email already exists" })
    }
    const salt= await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data, JWT_SECRET)
    success=true
    res.json({success,authToken})
  } catch (error) {
    console.log(error)
    res.status(500).send("Some error occured!!")
  }
},
)

//Route 2: Authenticate a user using POST './api/auth/login'. No login req 
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // console.log(req.body)
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      success= false
      return res.status(400).json({success, error: "Please enter correct credentials" })
    }
    
    const passwordCompaire=await bcrypt.compare(req.body.password, user.password);
    if(!passwordCompaire){
      success= false
      return res.status(400).json({success, error: "Please enter correct credentials"})
    }

    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET)
    success= true
    res.json({success,authToken})
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error!!")
  }
},
)

//Route 3: Get loggedin user details using POST './api/auth/getUser'. login req 
router.post('/getUser',fetchUser, async (req, res) => {
  
  try {
    userID= req.user.id
    const user = await User.findById(userID).select("-password");
    res.status(200).send({user})
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error!!")
  }
},
)

module.exports = router