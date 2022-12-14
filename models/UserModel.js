const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true
    },

},{timestamps:true})

// static signup method
userSchema.statics.signup = async function(name,email,number,password){

    // validate
    if(!email || !password || !name || !number){
        throw Error('All fields must be field')
    }
    if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email )){
          throw Error('Email is not valid')
      }
      if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$/.test(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email})
    if(exists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(7)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,email,number,password: hash})
    return user
}
// static login method
userSchema.statics.login = async function(name,email,password){
    
    if(!name || !email || !password){
        throw Error('All fields must be field')
    }

    const user = await this.findOne({email})
    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password,user.password)
    if(!match) {
        throw Error('Incorrect password')
    }
    return user
}


module.exports = mongoose.model('User', userSchema)

