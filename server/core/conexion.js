const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`)
.then(() => {
  console.log('Base de datos en linea');
})
.catch((err) => {
  throw new Error('No se pudo conectar a la base de datos. ' + err);
})