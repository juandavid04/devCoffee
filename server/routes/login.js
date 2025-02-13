const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}).exec()
    .then((usuarioDB) => {
        try {
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos.'
                    }
                });
            }
    
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos.'
                    }
                });
            }
    
            let token = jwt.sign({
                    usuario: usuarioDB.toJson()
                },process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
    
            return res.json({
                ok: true,
                usuario: usuarioDB.toJson(),
                token
            });
        } catch (error) {
            console.log(error)
        }
    } )
    .catch((err) => {
        res.status(500).json({
            ok: false,
            err
        });
    })
})

module.exports = app;