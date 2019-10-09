import express from 'express';
import DbConn from './db/index';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Logger from './db/Logger';
import mainRouter from './routes/index';

class App {
    constructor() {
        this.dbConn = new DbConn;
        this.initApp();
    }

    async initApp() {
        await dotenv.config()
        await this.dbConn.initModels();
        const expressApp = express();
        expressApp.use(bodyParser.json());
        console.log(process.env.NODE_ENV);
        expressApp.use((err, req, res, next) => {
            console.error(req.path);
            console.error(err.stack);
            res.status(500).json({ error: err });
        });
        expressApp.use('/', mainRouter);
        await expressApp.listen(3000);
        Logger.info('HTTP server running on port 3000');
    }
}

export default App;