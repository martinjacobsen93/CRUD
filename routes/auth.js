const { check } = require('express-validator');
const { Router } = require('express');
const { login } = require('../controllers/auth');
const validarCampos = require('../middlewares/validateFields');

const router = new Router();

router.post('/login', [
    check('correo', 'El campo correo es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').notEmpty(),
    validarCampos
], login);

module.exports = router;