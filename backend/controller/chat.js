const Chat = require('../models/chat');
const User = require('../models/user');

exports.chatPost = async(req, res)=>{
    const message=req.body.message
    console.log(message, "message==");
    try{
        const userMessage = await Chat.create({message, userId :req.user.id})
        res.status(200).json({userMessage});
    }
    catch(err){
        console.log(err);
    }
}