const { check } = require('express-validator');

const { Router } = require('express');
const { getUser,
        getUsers,
        createUser,
        updateUser,
        deleteUser } = require('../controllers/users');
const validarCampos = require('../middlewares/validateFields');
const { existeRol, existeMail, esIdValido } = require('../helpers/db-Validators');
const { validarJWT } = require('../middlewares/validate-jwt');
const { esAdminRole } = require('../middlewares/validateRol');

const router = Router();

router.get('/:id', [
    check('id').custom(esIdValido),
    validarCampos
], getUser);

router.get('/', getUsers);
router.post('/createUser',[
    check('nombre','El nombre es un campo obligatorio').notEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('password','El campo password es obligatorio y debe tener al menos 6 caracteres').notEmpty().isLength({min: 6}),
    check('correo').custom(existeMail),
    check('rol').custom(existeRol),
    validarCampos

],createUser);
router.put('/:id', [
    check('id').custom(esIdValido),
    check('nombre','El nombre es un campo obligatorio').notEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('password','El campo password es obligatorio y debe tener al menos 6 caracteres').notEmpty().isLength({min: 6}),
    check('rol').custom(existeRol),
    validarCampos
],updateUser);
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(esIdValido),
    validarCampos
], deleteUser);


module.exports = router;