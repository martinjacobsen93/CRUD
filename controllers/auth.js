const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const login = async ( req, res = response) => {

    const { correo, password } = req.body

    try {
        
        // Verificar si mail existe
        const usuario = await Usuario.findOne({correo});
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Correo o contraseña incorrectos (Correo incorrecto)'
            });
        };

        // Validar si el usuario está activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Correo o contraseña incorrectos (Usuario inactivo)'
            });
        }
         

        // Validar contraseña
        const esPasswordValida = bcryptjs.compareSync(password, usuario.password);

        if (!esPasswordValida) {
            return res.status(401).json({
                msg: 'Correo o contraseña incorrectos (contraseña incorrecta)'
            });
        }

        // Generar JWT


        res.json({
            msg: 'Login ok'
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: "Ha ocurrido un error"
        })
        
    }



}

module.exports = {
    login,
}