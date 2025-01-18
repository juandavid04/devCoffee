const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// ROUTES
app.use(require('./routes/index'));

// DATABASE
require('./core/conexion');

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
})