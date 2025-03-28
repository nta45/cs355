'use strict'

const $ = document.querySelector.bind(document);


// login link action
<<<<<<< HEAD
$('#loginLink').addEventListener('click', openLoginScreen);
// register link action
$('#registerLink').addEventListener('click', openRegisterScreen);
// logout link action
$('#logoutLink').addEventListener('click', openLogoutScreen);
=======
$('#loginLink').addEventListener('click',openLoginScreen);

// register link action
$('#registerLink').addEventListener('click',openRegisterScreen);

// logout link action
$('#logoutLink').addEventListener('click',openLoginScreen);
>>>>>>> parent of 310c4f5 (finished assignment 7-security)

// Sign In button action
$('#loginBtn').addEventListener('click', () => {
    // check to make sure username/password aren't blank
    if (!$('#loginUsername').value || !$('#loginPassword').value)
        return;
<<<<<<< HEAD

    // POST provided username/password to authenticate user
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: $('#loginUsername').value,
            password: $('#loginPassword').value
        })
    }).then(r => r.json()).then((doc) => {
        if (!doc.auth) {
=======
     
    //   GET /users/{username}, where {username} is $('#loginUsername').value
    //     decode response from json to object called doc
    //     if doc.error, call showError(doc.error)
    //     otherwise, if doc.password is NOT the same as $('#loginPassword').value,
    //       call showError('Username and password do not match.')
    //     otherwise, call openHomeScreen(doc)
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    fetch('/users/'+$('#loginUsername').value).then(r => r.json()).then((doc)=>{
        if(doc.error){
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
            showError(doc.error);
        } else if(doc.password !== $('#loginPassword').value){
            console.log(doc.password);
            showError('Username and password do not match.');
        } else {
            openHomeScreen(doc);
        }
<<<<<<< HEAD
    }).catch(err => showError('ERROR at log: ' + err));
=======
    }).catch(err=>showError('ERROR: '+err));
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
});

// Register button action
$('#registerBtn').addEventListener('click', () => {
    // check to make sure no fields aren't blank
    if (!$('#registerUsername').value ||
        !$('#registerPassword').value ||
        !$('#registerName').value ||
        !$('#registerEmail').value) {
        showError('All fields are required.');
        return;
    }
    // grab all user info from input fields, and POST it to /users
    var data = {
        username: $('#registerUsername').value,
        password: $('#registerPassword').value,
        name: $('#registerName').value,
        email: $('#registerEmail').value
    };
<<<<<<< HEAD

    // POST /users and get authentication token
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(r => r.json()).then((doc) => {
        if (!doc.auth) {
=======
     
    //   POST /users
    //     convert data (defined above) to json, and send via POST to /users
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, openHomeScreen(doc)
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    
    fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    }).then(r => r.json()).then((doc)=>{
        if(doc.error){
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
            showError(doc.error);
        } else {
            openHomeScreen(doc);
        }
<<<<<<< HEAD
    }).catch(err => showError('ERROR at reg: ' + err));
=======
    }).catch(err=>showError('ERROR: '+err));
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
});

// Update button action
$('#updateBtn').addEventListener('click', () => {
    // check to make sure no fields aren't blank
    if (!$('#updateName').value || !$('#updateEmail').value) {
        showError('Fields cannot be blank.');
        return;
    }
    // grab all user info from input fields
    var data = {
        name: $('#updateName').value,
        email: $('#updateEmail').value
    };
<<<<<<< HEAD

    // getting authToken from localStorage to send with PATCH request
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        showError('Authentication token not found.');
        return;
    }

    //  PATCH /users/{username}
    fetch('/users/' + $('#username').innerText, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + authToken },
=======
     
    //   PATCH /users/{username}, where {username} is $('#username').innerText
    //     convert data (defined above) to json, and send via PATCH to /users/{username}
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, if doc.ok,
    //       alert("Your name and email have been updated.");
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    
    fetch('/users/'+$('#username').innerText, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
        body: JSON.stringify(data)
    }).then(r => r.json()).then((doc) => {
        if (doc.error) {
            showError(doc.error);
        } else if (doc.ok) {
            alert("Your name and email have been updated.");
        }
<<<<<<< HEAD
    }).catch(err => showError('ERROR at patch: ' + err));
=======
    }).catch(err=>showError('ERROR: '+err));
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
});

// Delete button action
$('#deleteBtn').addEventListener('click', () => {
    // confirm that the user wants to delete
    if (!confirm("Are you sure you want to delete your profile?"))
        return;
<<<<<<< HEAD

    // getting authToken from localStorage to send with PATCH request
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        showError('Authentication token not found.');
        return;
    }

    //   DELETE /users/{username}
    fetch('/users/' + $('#username').innerText, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Token ' + authToken
        }
    }).then((doc) => {
        if (doc.error) {
            showError(doc.error);
        } else {
            openLoginScreen();
        }
    }).catch(err => { showError('ERROR at del: ' + err); });
});

function showListOfUsers() {

    //getting authToken from localStorage to send with PATCH request
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        showError('Authentication token not found.');
        return;
    }

    //   GET /users
    fetch('/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + authToken
        }
    }).then(r => r.json()).then((docs) => {
        if (docs.error) {
            showError(docs.error);
            return;
        }
=======
     
    //   DELETE /users/{username}, where {username} is $('#username').innerText
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, openLoginScreen()
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    fetch('/users/'+$('#username').innerText,{
        method: 'DELETE'
    }).then((doc)=>{
        if(doc.error){
            showError(doc.error);
        } else {
            console.log("Opened login screen");
            openLoginScreen();  
        }
    }).catch(err=>{console.log("errored");showError('ERROR: '+err);});
});

function showListOfUsers(){
    
    //   GET /users
    //     decode response from json to an array called docs
    //     for every doc in docs, call showUserInList(doc)
    //       you can do this by using a for-loop or, better yet, a forEach function:
    //         docs.forEach(showUserInList)
    //   use .catch(err=>showError('Could not get user list: '+err)}) to show any potential errors
    fetch('/users').then(r => r.json()).then((docs)=>{
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
        docs.forEach(showUserInList);
    }).catch(err => showError('Could not get user list: ' + err));
}

function showUserInList(doc) {
    // add doc.username to #userlist
    var item = document.createElement('li');
    $('#userlist').appendChild(item);
    item.innerText = doc.username;
}

function showError(err) {
    // show error in dedicated error div
    $('#error').innerText = err;
}

function resetInputs() {
    // clear all input values
    var inputs = document.getElementsByTagName("input");
    for (var input of inputs) {
        input.value = '';
    }
}

function openHomeScreen(doc) {
    // hide other screens, clear inputs, clear error
    $('#loginScreen').classList.add('hidden');
    $('#registerScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal home screen
    $('#homeScreen').classList.remove('hidden');
    // display name, username
    $('#name').innerText = doc.name;
    $('#username').innerText = doc.username;
    // display updatable user info in input fields
    $('#updateName').value = doc.name;
    $('#updateEmail').value = doc.email;
    // clear prior userlist
    $('#userlist').innerHTML = '';
    // show new list of users
    showListOfUsers();
}

function openLoginScreen() {
    // hide other screens, clear inputs, clear error
    $('#registerScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal login screen
    $('#loginScreen').classList.remove('hidden');
}

<<<<<<< HEAD
function openLogoutScreen() {
    // hide other screens, clear inputs, clear error
    $('#registerScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // delete local storage
    localStorage.removeItem('authToken');
    // reveal login screen
    $('#loginScreen').classList.remove('hidden');
    // add a text underneath that says suuccessfully logged out
    showError('Successfully logged out.');
}

function openRegisterScreen() {
=======
function openRegisterScreen(){
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
    // hide other screens, clear inputs, clear error
    $('#loginScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal register screen
    $('#registerScreen').classList.remove('hidden');
}

