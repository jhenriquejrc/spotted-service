var mongoose = require('mongoose');
var db = require('../db_config.js');

var spottedSchema = mongoose.Schema({

    descricao: String,
    status: Boolean,
    anonimo: Boolean,
    localidade: {
        longitude: String,
        latitude: String,
        endereco: String
    },
    id_usuario: String,
    display_name : String,
    created_at: Date
});

module.exports = mongoose.model('Spotted', spottedSchema);
