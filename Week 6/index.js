const express = require('express');
const app = express();
const nedb = require('nedb-promises');

app.use(express.static('public'));

const db = nedb.create('hits.jsonl'); // database

app.get('/hits', (req, res) => {
    db.find({}).then(docs => {
        if (docs.length) {
            db.updateOne({"hits":docs[0].hits},{$set: {"hits": docs[0].hits + 1}},{upsert:true})
        } else {
            db.insertOne({"hits": 1})
        }

        res.contentType('text/plain').send((docs[0].hits).toString() );
    });
});

app.get('/', (req, res) => {
    res.send({message:"Hello, World!"});
});

app.listen(3000, () => console.log("server is running on port 3000"));

