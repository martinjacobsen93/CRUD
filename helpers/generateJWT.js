const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {

    const payload = { uid };

    return new Promise( (res, rej)=> {
        jwt.sign(payload, process.env.SECRETJWTSIGN, {
            expiresIn: '24h'
        }, (err, token)=> {
            if (err) {
                console.log(err);
                rej('Ha ocurrido un error');
            } else {
                res(token)
            }
        });
    });
}

module.exports = {
    generarJWT
}