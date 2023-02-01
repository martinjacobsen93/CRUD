const express = require('express');
const path = require('path');
const cors = require('cors');
const connectToDB = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Database connection
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        // PUBLIC
        this.app.use(express.static(path.join(__dirname,'..','public')));
        // Lectura y parseo
        this.app.use(express.json());
    }

    async dbConnection() {
        await connectToDB();
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log(`Server is running and listening on port ${this.port}`);
        });
    };

}

module.exports = Server;