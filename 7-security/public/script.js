'use strict'

const $ = document.querySelector.bind(document);

// login link action
$('#loginLink').addEventListener('click', openLoginScreen);
// register link action
$('#registerLink').addEventListener('click', openRegisterScreen);
// logout link action
$('#logoutLink').addEventListener('click', openLogoutScreen);

// Sign In button action
$('#loginBtn').addEventListener('click', () => {
    // check to make sure username/password aren't blank
    if (!$('#loginUsername').value || !$('#loginPassword').value)
        return;

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
            showError(doc.error);
        } else {
            localStorage.setItem('authToken', doc.auth);
            openHomeScreen(doc);
        }
    }).catch(err => showError('ERROR at log: ' + err));
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
    // grab all user info from input fields, and POST it to /register
    var data = {
        username: $('#registerUsername').value,
        password: $('#registerPassword').value,
        name: $('#registerName').value,
        email: $('#registerEmail').value
    };

    // POST /users and get authentication token
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(r => r.json()).then((doc) => {
        if (!doc.auth) {
            showError(doc.error);
        } else {
            localStorage.setItem('authToken', doc.auth);
            openHomeScreen(doc);
        }
    }).catch(err => showError('ERROR at reg: ' + err));
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
        body: JSON.stringify(data)
    }).then(r => r.json()).then((doc) => {
        if (doc.error) {
            showError(doc.error);
        } else if (doc.ok) {
            alert("Your name and email have been updated.");
        }
    }).catch(err => showError('ERROR at patch: ' + err));
});

// Delete button action
$('#deleteBtn').addEventListener('click', () => {
    // confirm that the user wants to delete
    if (!confirm("Are you sure you want to delete your profile?"))
        return;

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
    // to display name, username
    $('#name').innerText = doc.user.name;
    $('#username').innerText = doc.user.username;
    // display updatable user info in input fields
    $('#updateName').value = doc.user.name;
    $('#updateEmail').value = doc.user.email;
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
    // hide other screens, clear inputs, clear error
    $('#loginScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal register screen
    $('#registerScreen').classList.remove('hidden');
}

