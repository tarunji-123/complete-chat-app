const Chat = require('../models/chat');
const User = require('../models/user');

exports.chatPost = async(req, res)=>{
    const message=req.body.message
    console.log(message, "message==");
    try{
        const chat = await Chat.create({message, username: req.user.name, userId : req.user.id});
        res.status(200).json({chat});
    }
    catch(err){
        console.log(err);
    }
}

exports.allChats = async(req,res)=>{
    try{
        const chats = await Chat.findAll();
        console.log(chats);
        if(chats){
            res.status(200).json(chats);
        }else{
            res.status(404).json({
                'success':'false'
            })
        }
    }
    catch(error){
        res.status(404).json({
            'success':'false'
        })
    }
}

