const nedb = require('nedb-promises');

const db = nedb.create('evs.jsonl');

db.insertOne({ name: 'Nathan', age: 21 });
db.insertOne({ name: 'Anjuli', age: "idk"});
