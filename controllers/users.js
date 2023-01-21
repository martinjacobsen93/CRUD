const { request, response } = require('express');

const getUser =  (req, res) => {

    const {nombre = 'Not found', apellido = 'Not found'} = req.query

    res.json({
        msg: "Get user endpoint",
        nombre,
        apellido,
    })

};

const createUser =  (req, res) => {

    const {nombre, apellido, email} = req.body

    res.json({
        msg: "User created successfully",
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