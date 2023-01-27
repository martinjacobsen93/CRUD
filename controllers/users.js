const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

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

const modifyUser =  (req = request, res) => {

    const { id } = req.params;

    res.json({
        msg: "Modify user endpoint",
        id,
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
    modifyUser,
    deleteUser,
}