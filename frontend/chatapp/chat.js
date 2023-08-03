var form = document.getElementById('my-form');
var chat = document.querySelector('.send');
const ul = document.getElementById('items');

chat.addEventListener('click',addChat);

async function addChat(e){
    e.preventDefault();

    let chat = document.getElementById('chat').value;
    obj= {
        message : chat,
    }
    console.log(obj);

    try{
        const token = localStorage.getItem("token");
        console.log(token,"==>token");
        const response = await axios.post(
            `http://localhost:3000/chat/message`,obj,{
                headers :{Authorization : token}
            });
        console.log(response,"-->response");
        
        document.getElementById('chat').value = '';
    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('http://localhost:3000/chat/all-chats',{headers : {Authorization : token}});
        getChat(response.data);
    }
    catch(err){
        console.log(err);
    }
})

const getChat = (chats)=>{
    console.log(chats, "chats-->")
    for(let chat of chats){
        console.log(chat,"chat--")
        let li = document.createElement('li');
        li.className ='list-unstyled';
        li.innerHTML = chat.username + " - "+ chat.message;
        ul.appendChild(li);
    }
}
