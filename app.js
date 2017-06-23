var app = require('./app_config.js');

var spottedController = require('./controller/spottedController.js');

var validator = require('validator');
var util = require('util');

app.get('/', function (req, res) {
    res.end('Servidor ON!');
});

app.get('/spotteds', function (req, res) {
    spottedController.list(function (response) {
        res.json(response);
    });
});

app.get('/spotteds/:id', function (req, res) {
    var id = req.param('id');
    spottedController.spotteds(id, function (response) {
        res.json(response);
    });
});

app.post('/spotteds', function (req, res) {

    var descricao = req.param('descricao');
    var status = req.param('status');
    var anonimo = req.param('anonimo');
    var localidade = req.param('localidade');
    var id_usuario = validator.trim(validator.escape(req.param('id_usuario')));
    var display_name = validator.trim(validator.escape(req.param('display_name')));
    spottedController.save(descricao, status, anonimo, localidade, id_usuario, display_name, function(response){
        res.json(response);
    });


});

app.put('/spotteds/', function (req, res) {

    var id = validator.trim(validator.escape(req.param('id')));
    var descricao = validator.trim(validator.escape(req.param('descricao')));
    var status = validator.trim(validator.escape(req.param('status')));
    var anonimo = validator.trim(validator.escape(req.param('anonimo')));
    var id_usuario = validator.trim(validator.escape(req.param('id_usuario')));
    var display_name = validator.trim(validator.escape(req.param('display_name')));
    var localidade = JSON.parse(req.param('localidade'));

   spottedController.update(id, descricao, status, anonimo, localidade, id_usuario, display_name, function(response){
       res.json(response);
   });

});

app.delete('/spotteds/:id', function (req, res) {
    var id = req.param('id');
    
    spottedController.delete(id, function(response){
        res.json(response);
    });
});