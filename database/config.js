const mongoose = require('mongoose');

const connectToDB = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('Se ha conectado a la base de manera exitosa');

    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error al intentar conectarse a la base de datos');
    }

}

module.exports = connectToDB;