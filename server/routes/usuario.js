const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get("/usuario", function (req, res) {

  let pagina = req.query.pagina;
  let porPagina = req.query.porPagina;

  if (pagina <= 0) {
    return res.status(400).json({
        ok: false,
        message: 'La pagina debe ser mayor que 0.',
    });
  }
  
  Usuario.find({estado: true}, 'id nombre email img role estado')
        .skip(porPagina*(pagina-1))
        .limit(porPagina)
        .exec()
        .then((r) => {

            Usuario.countDocuments({estado: true}).exec()
            .then((count) => {
                return res.json({
                    ok: true,
                    total: count,
                    paginas: Math.ceil(count/porPagina),
                    usuarios: r,
                })
            })
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        })
});

app.post("/usuario", async function (req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
    role: body.role,
  });

  usuario.save()
  .then((usuarioDB) => {
    // usuarioDB.password = null;
    return res.json({
        ok: true,
        usuario: usuarioDB.toJson(),
    });
  })
  .catch((err) => {
    return res.status(400).json({
        ok: false,
        err
    });
  });

});

app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;

  body = _.pick(body, ['nombre', 'email', 'img', 'role', 'estado'])

  Usuario.findByIdAndUpdate(id, body, {new: true})
  .exec()
  .then((usuarioDB) => {

    return res.json({
        ok: true,
        usuario: usuarioDB.toJson(),
    });
  })
  .catch((err) => {
    return res.status(400).json({
        ok: false,
        err
    });
  })
});

app.delete("/usuario/:id", function (req, res) {
  let id = req.params.id;

  Usuario.findByIdAndDelete(id).exec()
  .then((usuarioBorrado) => {

    if (usuarioBorrado === null) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario no encontrado',
            }
        });
    }

    return res.json({
        ok: true,
        usuarioBorrado
    });
  })
  .catch((err) => {
    return res.status(400).json({
        ok: false,
        err
    });
  })

});


app.put("/usuarioEstado/:id", function (req, res) {
    let id = req.params.id;

    Usuario.findById(id).exec()
    .then((usuario) => {
        Usuario.findByIdAndUpdate(id, {estado: !usuario.estado}, {new: true}).exec()
        .then((usuarioActualizado) => {
            if (usuarioActualizado === null) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado',
                    }
                });
            }
        
            return res.json({
                ok: true,
                usuario: usuarioActualizado.toJson(),
            });
            })
    
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
  
  });


module.exports = app;
