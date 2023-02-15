const validaCampos = require('../middlewares/validateFields');
const validarJWT = require('../middlewares/validate-jwt');
const validaRoles = require('../middlewares/validateRol');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
};