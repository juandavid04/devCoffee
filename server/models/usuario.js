const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido.'
}

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida.']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
    },
    google: {
        type: Boolean,
        default: false,
    },
    estado: {
        type: Boolean,
        default: true,
    }
})

usuarioSchema.methods.toJson = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin( mongooseUniqueValidator, {
    message: '{PATH} debe ser unico',
} )

module.exports = mongoose.model('Usuario', usuarioSchema);