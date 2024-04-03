const express = require('express');       // load express module
const nedb = require("nedb-promises");    // load nedb module
const bcrypt = require('bcrypt');         // load bcrypt module
const crypto = require('crypto');         // load crypto module
const app = express();                    // init app
const db = nedb.create('users.jsonl');    // init db

app.use(express.static('public'));        // enable static routing to "./public" folder
app.use(express.json());                  // decode all requests from JSON and encode all responses into JSON

// route to authenticate user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // check if user exists and password matches
    const user = await db.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.send({ error: 'Invalid username or password.' });
        return;
    }

    // creating an authentication token and storing it in the session
    const authToken = crypto.randomBytes(64).toString('hex');
    await db.update({ username }, { $set: { authToken } });
    res.send({ user: { username: user.username, name: user.name, email: user.email }, auth: authToken });
});

// route to register new user
app.post('/register', async (req, res) => {
    const { username, password, name, email } = req.body;

    // check if user already exists
    const user = await db.findOne({ username });
    if (user) {
        return res.send({ error: 'Username already exists.' });
    }

    // hash password and put in database
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.insertOne({ username, password: hashedPassword, name, email });

    // creating an authentication token and storing it in the session
    const authToken = crypto.randomBytes(64).toString('hex');
    await db.update({ username }, { $set: { authToken } });
    res.send({ user: { username: user.username, name: user.name, email: user.email }, auth: authToken });
});

// create route to get all user records (GET /users)
app.get('/users', async (req, res) => {
    // Check if authentication token exists
    const authToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const user = await db.findOne({ authToken });
    if (!authToken || !user) {
        return res.send({ error: 'Unauthorized' });
    }

    // once authenticated, return all user records
    db.find({}).then((docs) => {
        res.send(docs);
    }).catch((error) => {
        res.send({ error });
    });
});

// create route to get a user record (GET /users/:username)
app.get('/users/:username', async (req, res) => {
    // Check if authentication token exists
    const authToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const user = await db.findOne({ authToken });
    if (!authToken || !user) {
        return res.send({ error: 'Unauthorized' });
    }
    // once authenticated, return user record
    db.findOne({ "username": req.params.username }).then((docs) => {
        if (docs) {
            res.send(docs);
        } else {
            res.send({ error: 'Username not found.' })
        }
    }).catch((error) => {
        res.send({ error });
    });
});

// create route to update user doc (PATCH /users/:username)
app.patch('/users/:username', async (req, res) => {
    // Check if authentication token exists
    const authToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const user = await db.findOne({ authToken });
    if (!authToken || !user) {
        return res.send({ error: 'Unauthorized' });
    }
    // once authenticated, update user record
    db.updateOne({ "username": req.params.username }, { $set: req.body }).then((docs) => {
        if (JSON.stringify(docs).length >= 1) {
            res.send({ ok: true });
        } else {
            res.send({ error: 'Something went wrong.' });
        }
    }).catch((error) => {
        res.send({ error });
    });
});

// create route to delete user doc (DELETE /users/:username)
app.delete('/users/:username', async (req, res) => {
    // Check if authentication token exists
    const authToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const user = await db.findOne({ authToken });
    if (!authToken || !user) {
        return res.send({ error: 'Unauthorized' });
    }
    // once authenticated, delete user record
    db.deleteOne({ "username": req.params.username }).then(r => r.json()).then((docs) => {
        if (docs.length > 1) {
            res.send({ ok: true });
        } else {
            res.send({ error: 'Something went wrong.' });
        }
    }).catch((error) => {
        res.send({ error });
    });
});

// default route
app.all('*', (req, res) => { res.status(404).send('Invalid URL.') });

// start server
app.listen(3000, () => console.log("Server started on http://localhost:3000"));
