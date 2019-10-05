export const { debug } = process.env;

export const dbParams = {
    host: '127.0.0.1',
    port: '27017',
    database: 'portfolio'
};

export default {
    debug,
    dbParams
};