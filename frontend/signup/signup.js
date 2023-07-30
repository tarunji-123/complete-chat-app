var form = document.getElementById('my-form');

var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
// console.log("helo",xyz,"hii", email, password);

form.addEventListener('submit',addForm);

async function addForm(e){
    e.preventDefault();
    try{
        var name = nameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
    
        let formDetails ={
            name,
            email,
            password
        }
        console.log(formDetails);
    
        let response = await axios.post('http://localhost:3000/user/signup',formDetails);
        console.log("hello");
        if(response.status == 201){
            alert(response.data.message);
            window.location.href = "../login/login.html"
        }else {
            alert(response.data.message);
            throw new Error('Failed to login');
        }
        form.reset();

    }catch(err){
        console.log(err);
        document.body.innerHTML +=`<div style='color:red'>${err}<div>`;
    }
}