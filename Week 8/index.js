const express = require('express');       // load express module
const nedb = require("nedb-promises");    // load nedb module

const app = express();                    // init app
const db = nedb.create('users.jsonl');    // init db

app.use(express.static('public'));        // enable static routing to "./public" folder

<<<<<<< HEAD
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
=======

// automatically decode all requests from JSON and encode all responses into JSON
app.use(express.json());

>>>>>>> parent of 310c4f5 (finished assignment 7-security)

// create route to get all user records (GET /users)
//   use db.find to get the records, then send them
//   use .catch(error=>res.send({error})) to catch and send errors
app.get('/users', (req, res) => {
    db.find({}).then((docs) => {
        res.send(docs);
    }).catch((error) => {
        res.send({ error });
    });
});

<<<<<<< HEAD
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
=======

// create route to get user record (GET /users/:username)
//   use db.findOne to get user record
//     if record is found, send it
//     otherwise, send {error:'Username not found.'}
//   use .catch(error=>res.send({error})) to catch and send other errors
app.get('/users/:username', (req, res) => {
    db.findOne({ "username":req.params.username }).then((docs) => { 
            if (docs){
                res.send(docs); 
            } else { 
                res.send({ error: 'Username not found.' }) 
            } 
        }).catch((error) => {
            res.send({ error });
        });
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
});


// create route to register user (POST /users)
//   ensure all fields (username, password, email, name) are specified; if not, send {error:'Missing fields.'}
//   use findOne to check if username already exists in db
//     if username exists, send {error:'Username already exists.'}
//     otherwise,
//       use insertOne to add document to database
//       if all goes well, send returned document
//   use .catch(error=>res.send({error})) to catch and send other errors
app.post('/users', (req, res) => {
    const { username, password, name, email } = req.body;
    
    if (!username && !password && !name && !email) {
        res.send({ error: 'Missing fields.' });
        return;
    }
<<<<<<< HEAD
    // once authenticated, update user record
    db.updateOne({username: req.params.username }, { $set: req.body }).then((docs) => {
=======
    db.findOne({ username }).then((docs) => {
            if (docs) { 
                res.send({ error: 'Username already exists.' });
            } else {
                db.insertOne(req.body)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        res.send({ error });
                    });
            }
        }).catch((error) => {
            res.send({ error });
        });
});



// create route to update user doc (PATCH /users/:username)
//   use updateOne to update document in database
//     updateOne resolves to 0 if no records were updated, or 1 if record was updated
//     if 0 records were updated, send {error:'Something went wrong.'}
//     otherwise, send {ok:true}
//   use .catch(error=>res.send({error})) to catch and send other errors
app.patch('/users/:username', (req, res) => {
    db.updateOne({ "username":req.params.username }, { $set: req.body }).then((docs) => {
>>>>>>> parent of 310c4f5 (finished assignment 7-security)
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
//   use deleteOne to update document in database
//     deleteOne resolves to 0 if no records were deleted, or 1 if record was deleted
//     if 0 records were deleted, send {error:'Something went wrong.'}
//     otherwise, send {ok:true}
//   use .catch(error=>res.send({error})) to catch and send other errors
app.delete('/users/:username', (req, res) => {
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
