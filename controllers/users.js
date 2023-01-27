const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUser = async (req, res) => {

    const { limit = 10, offset = 0 } = req.query

    const [ totalUsuarios, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .limit(Number(limit))
        .skip(Number(offset))
    ])

    res.json({
        totalUsuarios,
        usuarios,
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
    const { _id, password, google, ...resto } = req.body;
    // TO DO:
    // Validar que por query venga un ID de mongo válido

    // Validar si el usuario quiere modificar la password
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(201).json({
        msg: `User with id ${id} has been updated`
    })

};

const deleteUser = async (req, res) => {

    const { id } = req.params;

    // TODO: Validar si el estado ya es false, caso sea false indicar que no existe dicho usuario

    // const usuario = Usuario.findById(id);

    // if (!usuario.estado) {

    //     console.log(usuario.schema.obj.estado)

    //     return res.status(400).json({
    //         msg: `No existe un usuario con el id ${id}`
    //     });
    // }
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: `El usuario con ${id} fué eliminado con éxito.`,
        usuario
    });

};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}