const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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
    console.log("email ==> ", email);
    console.log("hii");
    if(isstringInvalid(name) || isstringInvalid(email) || isstringInvalid(password)){
        return res.status(400).json({
            message : "Bad parameters, Something is missing"
        })
    }

    const user = await User.findOne({where :{email : email}})
    console.log(user,"user");
    if(user ){
        console.log("email id is present");
        return res.status(200).json({message : "email id is already present, Please Login"});
    }
    
    const saltrounds = 10;
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
        // console.log(err);
        const result = await User.create({name, email, password:hash})
        res.status(201).json({userInfo : result,message : 'Successfully create new user'});
    })
    
    }catch(err){
        res.status(500).json({message : 'Something went wrong. Please check again'});
    }
}

function generateAccessToken(id, name){
    console.log("token generate");
    return jwt.sign({userId : id, name : name }, process.env.SECRET_KEY);

}

exports.login = async (req,res,next)=>{
    try{
        const {email , password} = req.body;

        if(isstringInvalid(email) || isstringInvalid(password)){
            return res.status(400).json({
                message: "email or password is missing",
                success : false
            });
        }

        const user = await User.findOne({where:{email : email}});

        if(user){
            bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    res.status(201).json({message :"SuccessFully Login", token : generateAccessToken(user.id, user.name)});
                }else{
                    res.status(401).json({message: "User not authorized, Password is wrong"});
                }
            })
        }else{
            res.status(400).json({message: "User not found"});
        }
    }catch(err){
        res.status(500).json({message:"something is wrong."})
    }
}
