window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "Sign in";
    }
    else{
        document.getElementById('signintext').innerHTML = "Log out";
        
    }
    document.getElementById('loged_user_name').innerHTML = "Hello " + window.localStorage.getItem('username')
    fetch('http://127.0.0.1:5000/api/v3/userdata',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'x-access-token' : window.localStorage.getItem('token')
    }
    })
    .then(res=>res.json())
    .then(data =>{
        let output = '';
        data["my_rides"].forEach(response=>{
            output += `<div class="ride" style="background-image:url('static/images/blur.jpg');">

                <div class="container">
                <h4>Ride : ${response['ride']} &nbsp;&nbsp; departure_time : ${response['departure_time']} <br>
                numberplate : ${response['numberplate']} &nbsp;&nbsp; maximum : ${response['maximum']} <br>
                status : ${response['status']}
                    <a class="button" type="button" id="editride" onclick="get_details(${response['ride_id']})">Edit Ride</a> </h4>
                    <br>
                <h2>Requests</h2>
                <table class="table">
                <tr>
                    <th>request_id</th>
                    <th>username</th>
                    <th>email</th>
                    <th>Status</th>
                    <th>accepted</th>
                    <th>Accept/reject</th>
                </tr>`            
        response['requests'].forEach(res=>{
            output += `
                <tr>
                    <td>${res['request_id']}</td>
                    <td>${res['user']['username']}</a> </td>
                    <td>${res['user']['email']}</td>
                    <td>${res['status']}</td>
                    <td>${res['accepted']}</td>
                    <td>
                    <a class="button" onclick="accept_reject(${response['request_id']})">Accept/reject</a>
                    </td>
                </tr>`
                
            })
            output +=
    
            `</table>
                
            </div>
            </div>`
        })
                document.getElementById("page-container").innerHTML = output;
    })
    



// function get_details(ride_id){
//     // console.log(ride_id)

//     fetch(`http://127.0.0.1:5000/api/v3/rides/${ride_id}/requests`,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': window.localStorage.getItem('token')
//         },
//     })
//     .then(res=> res.json())
//     .then(data=>{
//         console.log(data)
//         // if(data.status === 'failed'){
//         //     document.getElementById('wrong_details').style.display='block';
//         //     document.getElementById('wrong_details').innerHTML=data.message

//         //     document.getElementById('correct_details').style.display='none';
//         // }else{
//         //     document.getElementById('correct_details').style.display='block';

//         //     document.getElementById('correct_details').innerHTML= 'Request Successfully Created'

//         //     document.getElementById('wrong_details').style.display='none';
//         // }
//     })
// }



var modal = document.getElementById('id01');

var btn = document.getElementById("createride");

var span = document.getElementsByClassName("close1");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

var createride = document.getElementById('newride');

createride.onclick= function(){
    let departurepoint = document.getElementById('departurepoint').value;
    let destination = document.getElementById('destination').value;
    let departuretime = document.getElementById('departuretime').value;
    let numberplate = document.getElementById('numberplate').value;
    let maximum = document.getElementById('maximum').value;

    fetch('http://127.0.0.1:5000/api/v3/rides',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "departurepoint": departurepoint,
            "destination": destination,
            "departuretime": departuretime,
            "numberplate": numberplate,
            "maximum": maximum})
    })    
    .then(res => res.json())
    .then(data => {
            console.log(data)
        if (data['message'] === "ride has been successfully created"){
            document.getElementById('id01').style.display='none';
            redirect: window.location.replace("./rides.html");
        }
        else{
            alert('ride has been not been created, try again')
        }

    })
}

var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./register.html");
    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./register.html");
    }
}
}
