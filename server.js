const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


var port = process.env.port || 3000

var router = express.Router()

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

var Message = require('./models/message')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado com sucesso ao banco de dados");
}).catch(err => {
    console.log('Erro ao tentar conectar ao banco de dados...', err);
    process.exit();
});

// define a simple route
router.get('/', (req, res) => {
    res.json({ "message": "Vai começar a brincadeira!" });
});

app.use('/api', router)

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});