var form = document.getElementById('my-form');
var chat = document.querySelector('.send');
console.log(chat);

const ul = document.getElementById('items');

let localChat = [];

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
        console.log(response.data);
        if(localChat.length == 1){
            localChat.shift();
        }
        localChat.push(response.data.chat);
        const xyz = localStorage.setItem("chats",JSON.stringify(localChat));
        console.log(xyz,"xyz");
        let li = document.createElement('li');
        li.innerHTML = response.data.chat.username+" - "+response.data.chat.message;
        ul.appendChild(li);
        console.log(chat.value,"chat.value");
        chat.value = '';
    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('http://localhost:3000/chat/all-user',{headers : {Authorization : token}});
        console.log(response);
        console.log(response.data.user, "response.data.user");
        showOnScreen(response.data.user);
        localChat = JSON.parse(localStorage.getItem("chats"))
        console.log(localChat,"localChat");
        if(localChat){
            getChat(localChat);
        }
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
        li.innerHTML = chat.username + " - "+ chat.message;
        ul.appendChild(li);
    }
}

function showOnScreen(data){
    console.log(data);
    for(let d of data){
        let li = document.createElement('li');
        li.innerHTML= d.name;
        ul.appendChild(li);
    }
}
