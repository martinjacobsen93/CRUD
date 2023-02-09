const jwt = require('jsonwebtoken');
const { request } = require('express')
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'Token required'
        })
    };

    try {

        const { uid } = jwt.verify(token, process.env.SECRETJWTSIGN);

        // Validar que el usuario exista en la BD
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario no existe en BD'
            })
        };
        // Validar que el usuario sea activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario inactivo'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    validarJWT
}