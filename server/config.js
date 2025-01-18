//============================================
// PUERTO DEL SERVIDOR
//============================================
process.env.PORT = process.env.PORT || 3000;

//============================================
// BASE DE DATOS
//============================================
process.env.DB_PORT = process.env.DB_PORT || 27017;
process.env.DB_NAME = 'DevCoffee';

//============================================
// CADUCIDAD DEL TOKEN
//============================================

process.env.CADUCIDAD_TOKEN = 60;

//============================================
// SEMILLA DEL TOKEN
//============================================

process.env.SEED = process.env.SEED || 'este-es_el-token__de_desarrollo--__';