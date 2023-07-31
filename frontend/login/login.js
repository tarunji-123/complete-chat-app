var form = document.getElementById('my-form');
console.log(form);
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');

form.addEventListener('submit',submitForm);

async function submitForm(e){

    try{
        e.preventDefault();

        const loginDetails ={
            email : emailInput.value,
            password : passwordInput.value,
        }

        const response = await axios.post(`http://localhost:3000/user/login`,loginDetails);
        console.log('hello guys , i m in login page');
        if(response.status === 201){
            alert(response.data.message);
            console.log(response.data);

            localStorage.setItem('token',response.data.token);
            console.log("great work");

            window.location.href = "../chatapp/chat.html"
            
        }
        else{
            alert(response.data.message);
            throw new Error('Failed to Proceed');
        }
        form.reset();
        
    }catch(err){
        console.log(JSON.stringify(err));
        console.log(err);
        document.body.innerHTML +=`<div style="color:red"> ${err.response.data.message}<div>`
    }
}


