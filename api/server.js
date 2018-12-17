var express = require('express')
var cors = require('cors')

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountSid = 'AC7e06e6dff1392daf27530c797a622670';
const authToken = 'e9a099f283825eec94a4940187932538';

const client = require('twilio')(accountSid, authToken);

// create express app
const app = express();
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Definindo a porta
var port = process.env.port || 8000

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

        //recebe os paramentros de envio de mensagem do Twillio
        telefoneIterator(req.body.telefones, req.body.mensagem)

        var message = new Message();
        message.protocolo = req.body.protocolo
        message.telefones = req.body.telefones
        message.mensagem = req.body.mensagem

        message.save(function (error) {
            if (error)
                res.send('Erro ao tentar salvar a Mensagem....: ' + error);
            res.json({ message: 'Mensagens enviadas com sucesso!' });
        });
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


// ouvinte do servidor
app.listen(port, () => {
    console.log("Sevidor rodando na porta 8000");
});

function telefoneIterator(telefones, mensagem) {
    var telefonesArr = telefones.split(",")

    for (let t in telefonesArr) {
        if (telefonesArr[t] == "83991811177") {
            sendMessage(mensagem, "67933007050", telefonesArr[t])
        }
    }
}

function sendMessage(message, numFrom, numTo) {
    client.messages.create({
        from: "55" + numFrom,
        to: "55" + numTo,
        body: message
    }).then((message) => console.log(message.sid));
}