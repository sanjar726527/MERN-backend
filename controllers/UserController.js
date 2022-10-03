const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}


// signup
const signupUser = async (req,res) => {
      
    const {name,email,number,password} = req.body

    
    try {
        const user = await User.signup(name,email,number,password)
    
        //create a token  
        const token = createToken(user._id)
        if(!user){
            res.status(401).json('Sorry, there was an error during registration')
        }
        res.status(200).json({name,email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

// login user
const loginUser = async (req,res) => {
    const {name,email,password} = req.body

    try {
        const user = await User.login(name,email,password)
        // create a token
        const token = createToken(user._id)
        if(!user){
            res.status(401).json('Sorry, there was an error during login')
        }
        res.status(200).json({name,email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



module.exports = { loginUser, signupUser  }
