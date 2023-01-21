const express = require('express');
const path = require('path');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        //Middlewares
        this.middlewares();

        //Routes
    }

    routes() {
        
    }

    middlewares() {
        this.app.use(express.static(path.join(__dirname,'..','public')));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log(`Server is running and listening on port ${this.port}`);
        });
    };

}

module.exports = Server;