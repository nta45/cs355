const params = new URLSearchParams(location.search);

loginInfo = ""
loginInfo += "<p> Your Username is: " + params.get('username') + "<br>";
loginInfo += "<p> Your Password is: " + params.get('password');

console.log(loginInfo);
hi = "Hello " + params.get('username') + "!<br>";
document.getElementById('card-content').innerHTML = loginInfo;
document.getElementById('card-title').innerHTML = hi;
