const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountSid = 'AC7e06e6dff1392daf27530c797a622670';
const authToken = 'e9a099f283825eec94a4940187932538';

const client = require('twilio')(accountSid, authToken);

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Definindo a porta
var port = process.env.port || 3000

//Defininfo o Router
var router = express.Router()

// Configuring the database
const dbConfig = require('./config/database.config.js');

//Pegando nosso Model
var Message = require('./models/message')

mongoose.Promise = global.Promise;

// Conexão com o banco de dados
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado com sucesso ao banco de dados");
}).catch(err => {
    console.log('Erro ao tentar conectar ao banco de dados...', err);
    process.exit();
});


//Rotas da nossa api
// middleware para esta rota
router.use(function timeLog(req, res, next) {
    console.log('Algo Aqui')
    next()
})

// define as rotas de mensagens
router.route('/messages')
    .post(function (req, res, next) {
        client.messages.create({
            from: "5567933007050",
            to: "5583991811177",
            body: "You just sent an SMS from Node.js using Twilio!"
        }).then((message) => console.log(message.sid));
        // var message = new Message();
        // message.protocolo = req.body.protocolo
        // message.telefones = req.body.telefones
        // message.mensagem = req.body.mensagem
        // message.save(function (error) {
        //     if (error)
        //         res.send('Erro ao tentar salvar a Mensagem....: ' + error);
        //     res.json({ message: 'Mensagens enviadas com sucesso!' });
        // });
    })

    .get(function (req, res) {
        Message.find(function (error, messages) {
            if (error)
                res.send('Erro ao listar mensages...: ' + error);
            res.json(messages);
        });
    });

router.get('/messages/:protocolo', function (req, res, next) {
    Message.
        find({ protocolo: req.params.protocolo }, function (error, protocolo) {
            if (error)
                res.send('protocolo não encontrado....: ' + error);
            res.json(protocolo);
        });
})


app.use('/api', router)
//=================


// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});