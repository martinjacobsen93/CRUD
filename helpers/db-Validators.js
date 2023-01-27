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

const esIdValido = async (id = '') => {

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById( id );
        if ( !existeUsuario ) {
            throw new Error(`El ID ${ id } no existe`);
        }
    } else {
        throw new Error(`El ID ${ id } no es válido`);
    }

}

module.exports = {
    existeRol,
    existeMail,
    esIdValido,
}