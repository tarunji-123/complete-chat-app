const User = require('../models/user');

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
    await User.create({name, email, password})
    res.status(201).json({message : 'Successfully create new user'});
    
    }catch(err){
        res.status(500).json(err);
    }
}