const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome! This is a simple notes CRUD app using Express, Node, MongoDB and Mongoose.'});
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});