window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "Sign in";
    }
    else{
        document.getElementById('signintext').innerHTML = "Log out";
        document.getElementById('loged_user_name').innerHTML = "Hello " + window.localStorage.getItem('username')
        let output = `<p id="loged_user_name"></p>
                      <a href="myrides.html"> My Rides </a>
                      <a href="myrequests.html"> My requests </a>`;
        document.getElementById('menubar2').innerHTML = output

    }
}
