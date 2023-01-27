const Role = require("../models/role");
const Usuario = require('../models/usuario');

const existeRol = async (rol = '') => {

    const existeRol = await Role.findOne({rol});

    if (!existeRol) {
        throw new Error(`El rol ${rol} no es un rol válido,`)
    };

};

// Validar si usuario con email dado ya existe
const existeMail = async (correo = '') => {

    const existeUsuario = await Usuario.findOne({correo});

    if (existeUsuario) {
        throw new Error(`Ya existe un usuario con el correo ${correo}, por favor intenta con otro.`)
    };
}

module.exports = {
    existeRol,
    existeMail,
}