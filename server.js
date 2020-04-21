const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configure the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the database!');
}).catch(() => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.get('/', (req, res) => {
    res.json({message: 'Welcome! This is a simple notes CRUD app using Express, Node, MongoDB and Mongoose.'});
});

// Notes routes
require('./app/routes/note.routes')(app);

app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});