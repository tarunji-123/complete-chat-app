const User = require('../models/user');
const bcrypt = require('bcrypt');

function isstringInvalid(string){
    if(string == undefined || string.length ===0){
        return true;
    }else{
        return false;
    }
}

exports.signup = async(req,res,next)=>{
    try{
        
    const {name, email, password } = req.body;

    if(isstringInvalid(name) || isstringInvalid(email) || isstringInvalid(password)){
        return res.status(400).json({
            message : "Bad parameters, Something is missing"
        })
    }
    const saltrounds = 10;
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
        // console.log(err);
        await User.create({name, email, password:hash})
        res.status(201).json({message : 'Successfully create new user'});
    })
    
    }catch(err){
        res.status(500).json(err);
    }
}