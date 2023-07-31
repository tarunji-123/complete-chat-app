var form = document.getElementById('my-form');
var chat = document.querySelector('.send');
// console.log(chat);

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
        chat = '';
    }
    catch(err){
        console.log(err);
    }
}