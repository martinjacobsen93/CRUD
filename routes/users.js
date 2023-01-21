const { Router } = require('express');
const { getUser,
        createUser,
        modifyUser,
        deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.patch('/', modifyUser);
router.delete('/', deleteUser);


module.exports = router;