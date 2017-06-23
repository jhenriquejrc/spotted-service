var Spotted = require('../model/spotted.js');

exports.list = function (callback) {
    Spotted.find({}, function (error, spotteds) {
        if (error) {
            callback({ error: 'Não foi possivel retornar os spotteds.' })
        } else {
            callback(spotteds);
        }
    }).sort([['created_at', 'descending']]);
};

exports.spotteds = function (id, callback) {
    Spotted.findById(id, function (error, spotted) {
        if (error) {
            callback({ error: 'Não foi possivel retornar o spotted.' })
        } else {
            callback(spotted);
        }
    });
};

exports.save = function (descricao, status, anonimo, localidade, id_usuario, display_name, callback) {
    new Spotted({
        'descricao': descricao,
        'status': status,
        'anonimo': anonimo,
        'localidade': {
            'longitude': localidade.longitude,
            'latitude': localidade.latitude,
            'endereco': localidade.endereco
        },
        'id_usuario': id_usuario,
        'display_name': display_name,
        'created_at': new Date()
    }).save(function (error, user) {
        if (error) {
            callback({ error: 'Não foi possivel salvar.' })
        } else {
            callback(user);
        }
    });
};

exports.update = function (id, descricao, status, anonimo, localidade, id_usuario, display_name, callback) {
    Spotted.findById(id, function (error, spotted) {

        if (descricao) {
            spotted.descricao = descricao;
        }

        if (status) {
            spotted.status = status;
        }

        if (anonimo) {
            spotted.anonimo = anonimo;
        }

         if (localidade) {
            spotted.localidade = localidade;
        }

         if (id_usuario) {
            spotted.id_usuario = id_usuario;
        }

         if (display_name) {
            spotted.display_name = display_name;
        }

        spotted.save(function (error, spotted) {
            if (error) {
                callback({ error: 'Não foi possível atualizar o spotted.' });
            } else {
                callback(spotted);
            }
        });

    });
};

exports.delete = function (id, callback) {
    Spotted.findById(id, function (error, spotted) {
        if (error) {
            callback({ error: 'Não foi possivel encontrar o spotted.' })
        } else {
            spotted.remove(function (error) {
                if (!error) {
                    callback({ response: 'Spotted excluido com sucesso' })
                }
            });
        }
    });
};