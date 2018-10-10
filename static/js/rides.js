window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "Sign in";
    }
    else{
        document.getElementById('signintext').innerHTML = "Log out";
        document.getElementById('loged_user_name').innerHTML = "Hello " + window.localStorage.getItem('username')
    }
    fetch('http://127.0.0.1:5000/api/v3/rides',{
        method: 'GET',
        headers:{
			'Content-Type': 'application/json',
    }
    })
    .then(res=>res.json())
    .then(data =>{
        let output = '';
        data["all rides"].forEach(response=>{
            output += `<div class="feature" type="button" onclick="request_ride(${response['ride_id']})" >
                <div class="wrapper" >
                    <div class="tripfeature">
                        <a class="wrapper" style="background-image:url('static/images/ride.jpg');">           
                            <div class="tripview">
                                <span class="featured">REQUEST</span>
                                <div class="tripdescription">
                                    <div><p class="triptitle"> ${response['ride']}</p></div>
                                    <div class="triptime"><p>Status: ${response['status']}</p></div>
                                    <div class="triptime"><p>Maximum: ${response['maximum']}</p></div>
                                    <div class="triptime"><p>Departure: ${response["departure_time"]}</p></div>                                    
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>`;
        })
        document.getElementById("page-container").innerHTML = output;
    })
    
}


function request_ride(ride_id){

    fetch(`http://127.0.0.1:5000/api/v3/rides/${ride_id}/requests`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{
        alert(data['message'])
    })
}



var modal = document.getElementById('id01');

var page = document.getElementById('page-container');

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