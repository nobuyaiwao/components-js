require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const https = require('https');
const getPaymentMethods = require('./api/paymentMethods');
const getOriginKeys = require('./api/originKeys');
const makePayment = require('./api/payments');
//const options = {
//  key:  fs.readFileSync('./server_key.pem'),
//  cert: fs.readFileSync('./server.crt')
//};

module.exports = (() => {
    app.use(morgan('combined'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(express.static(path.resolve(__dirname, '../../src')));

    app.all('/originKeys', (req, res) => getOriginKeys(res, req));
    app.all('/paymentMethods', (req, res) => getPaymentMethods(res, req.body));
    app.all('/payments', (req, res) => makePayment(res, req.body));

    const port = process.env.PORT || 3000;
    //https.createServer( options, app ).listen(port, () => console.log(`Listening on localhost:${port}`));
    app.listen(port, () => console.log(`Listening on localhost:${port}`));
})();
