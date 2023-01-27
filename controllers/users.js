const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUser =  (req, res) => {

    const {nombre = 'Not found', apellido = 'Not found'} = req.query

    res.json({
        msg: "Get user endpoint",
        nombre,
        apellido,
    })

};

const createUser = async (req = request, res = response) => {


    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // Guardar usuario en BD
    await usuario.save()


    res.status(201).json({
        msg: "User created successfully",
        usuario
    })

};

const updateUser = async (req = request, res) => {

    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    // Validar si el usuario quiere modificar la password
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: `User with id ${id} has been updated`
    })

};

const deleteUser =  (req, res) => {

    res.json({
        msg: "User deleted",
    })

};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}