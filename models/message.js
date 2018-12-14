var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * protocolo: String
 * mensagem: Text
 * telefones: string
 * 
 */

 var MessageScheme = new Schema({
     protocolo: String,
     mensagem: String,
     telefones: String
 })

 module.exports = mongoose.model('Message', MessageScheme)