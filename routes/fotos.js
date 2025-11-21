var express = require('express');
var router = express.Router();
// const Sequelize = require('sequelize');
const { Sequelize, Op } = require('sequelize'); //para usar la clausalas Op osea el where 
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

router.get('/findAll/json', function (req, res, next) {

    Foto.findAll({
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    }).then(fotos => {
        res.json(fotos);
    }).catch(error => res.status(400).send(error)
    )
});

//Para poner un rango
//http://localhost:3000/fotos/findAllByRate/json?lower=0&higher=1.2
router.get('/findAllByRate/json', function (req, res, next) {

    let lower = parseFloat(req.query.lower);
    let higher = parseFloat(req.query.higher);

    Foto.findAll({
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            calificacion: {
                [Op.between]: [lower, higher] //aqui hace la consulta
            }
        }
    }).then(fotos => {
        res.json(fotos);
    }).catch(error => res.status(400).send(error)
    )

});

//Buscar por Id
router.get('/findAllById/:id/json', function (req, res, next) {

    let id = parseInt(req.params.id);

    Foto.findAll({
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [
                { id: id }
            ]
            //aqui hace la consulta para id

        }
    }).then(fotos => {
        res.json(fotos);
    }).catch(error => res.status(400).send(error)
    )

});
module.exports = router;

