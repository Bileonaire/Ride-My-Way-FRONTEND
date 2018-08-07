var register = document.getElementById('register')


register.onclick= function(){
    document.getElementById('not_created').style.display='none';
    let username = document.getElementById('username').value;
    let email = document.getElementById('emaili').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;

    fetch('http://127.0.0.1:5000/api/v3/auth/register',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "confirm_password": confirm_password})
    })
    .then(res => res.json())
    .then(data => {

        if (data['message'] === 'user has been successfully created'){
            alert('Welcome ' + data['username'] +', you may now Login' )
            document.getElementById('flash').innerHTML= ('Login Here!')
        }
        else{
            document.getElementById('not_created').innerHTML= 'user has been not been created, try again';
            document.getElementById('not_created').style.color='red';
            document.getElementById('not_created').style.display='block';
        }

    })
}

var login = document.getElementById('login')


login.onclick= function(){
    document.getElementById('loginfail').style.display='none';
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;

    fetch('http://127.0.0.1:5000/api/v3/auth/login',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password})
    })
    .then(res => res.json())
    .then(data => {
        if (data['message'] === 'successfully logged in'){
            document.getElementById('loginfail').innerHTML= (data['message']);
            document.getElementById('loginfail').style.color='blue';
            document.getElementById('loginfail').style.display='block';
            window.localStorage.setItem('user_id', data['user_id'])
            window.localStorage.setItem('email', data['email'])
            window.localStorage.setItem('username', data['username'])
            window.localStorage.setItem('token', data['token'])

            redirect: window.location.replace("./rides.html")

        }
        else{
            document.getElementById('loginfail').innerHTML= "invalid email address or password";
            document.getElementById('loginfail').style.color='red';
            document.getElementById('loginfail').style.display='block';
        }

    })
}

// var getrides = document.getElementById('getrides')


// getrides.onclick= function(){

//     fetch('http://127.0.0.1:5000/api/v3/rides',{
//         method: 'GET',
//         mode:'cors',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
// }
