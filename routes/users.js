const { check } = require('express-validator');

const { Router } = require('express');
const { getUser,
        createUser,
        modifyUser,
        deleteUser } = require('../controllers/users');
const validarCampos = require('../middlewares/validateFields');
const { existeRol, existeMail } = require('../helpers/db-Validators');

const router = Router();

router.get('/', getUser);
router.post('/createUser',[
    check('nombre','El nombre es un campo obligatorio').notEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('password','El campo password es obligatorio y debe tener al menos 6 caracteres').notEmpty().isLength({min: 6}),
    check('correo').custom(existeMail),
    check('rol').custom(existeRol),
    validarCampos

],createUser);
router.patch('/:id', modifyUser);
router.delete('/', deleteUser);


module.exports = router;