# Get Into the Structure
## Package.json anyway
```json
{
    "name": "checkout-components-sample-code",
    "version": "1.0.0",
    "description": "Adyen Components Sample Code",
    "main": "src/index.js",
    "scripts": {
        "start": "npm run devserver",
        "test": "echo \"Error: no test specified\" && exit 1",
        "devserver": "node ./server/node/index.js"
    },
    "repository": {
        "type": "git",
        "url": ""
    },
    "keywords": [
        "Adyen",
        "Demo",
        "Payments",
        "Checkout",
        "Components",
        "Dropin"
    ],
    "author": "Adyen",
    "license": "MIT",
    "engines": {
        "node": "~8.11.2",
        "npm": "~6.1.0"
    },
    "dependencies": {
        "dotenv": "^6.1.0",
        "express": "^4.16.4",
        "request": "^2.81.0"
    }
}
```

## Files
```
server/
src/
node_modules/
```

## src/ - Client Side
```
.
├── index.html        // Links 

├── demo.css          // Style sheet

├── demo.js           // Functions for demo
                      //   updateStateContainer(newState)
                      //   updateRequestContqiner(response)
                      //   updateResponseContainer(response)

├── utils.js          // Utils ex. httpPost, getPaymentMethods, makePayment, getOriginKey
                      //    httpPost : post $2 data to $1 endpoint
                      //    getPaymetnMethods : post "paymentMethodsConfig" to 'paymentMethods'
                      //    makePayment : post "paymentsDefaultConfig" + $2 config + $1 paymentMethod to 'payments'
                      //    getOriginKey : post to 'originKeys'

├── favicon.ico
├── dropin
│   ├── dropin.js
│   └── index.html
├── card
│   ├── card.js
│   └── index.html
├── bancontact
│   ├── bancontact.js
│   └── index.html
├── boleto
│   ├── boleto.js
│   └── index.html
.
.
```

### index.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout Components sample code</title>
    <link rel="stylesheet" href="./demo.css">
</head>
<body>
    <div class="container">
        <h1>Adyen Checkout Components sample code</h1>

        <p>
            Components are our drop-in JavaScript modules that you can add to your payment page.
            <br>
            They render as input fields that collect required shopper details, and provide the values you need to make a payment.
        </p>


        <ul class="payment_methods__list">
            <li class="payment_methods__list__element">
                <a href="./kcpcard">KCP Test</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./dropin">Drop-in</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./bancontact">Bancontact Mobile Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./card">Card Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./googlepay">Google Pay Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./ideal">iDEAL Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./sepa">SEPA Direct Debit Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./wechatpay">WeChat Pay Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./boleto">Boleto Bancario Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./multibanco">Multibanco Component</a>
            </li>
            <li class="payment_methods__list__element">
                <a href="./swish">Swish Component</a>
            </li>
        </ul>

        <div class="info">
            <p>
                For more information, please refer to the <a href="https://docs.adyen.com/checkout/components-web/" target="_blank">Checkout Components documentation</a>.
            </p>
        </div>
    </div>

    <script src="demo.js"></script>
</body>
</html>
```

### demo.js

```javascript
const stateContainer = document.querySelector('.current-state');
const requestContainer = document.querySelector('.request-container');
const responseContainer = document.querySelector('.response-container');

// Demo - Update current component state container
function updateStateContainer(newState) {
    stateContainer.innerText = JSON.stringify(newState, null, 2);
}

// Demo - Update request container
function updateRequestContainer(response) {
    const defaultResponseParams = { merchantAccount: 'YOUR_MERCHANT_ACCOUNT' };
    requestContainer.querySelector('pre').innerText = JSON.stringify(
        { ...defaultResponseParams, ...response },
        null,
        2
    );
    requestContainer.classList.add('request-container--visible');
}

// Demo - Update server response container
function updateResponseContainer(response) {
    responseContainer.querySelector('pre').innerText = JSON.stringify(response, null, 2);
    responseContainer.classList.add('response-container--visible');
}

// Demo - Copy Source Code Examples
document.querySelectorAll('.copy-sample-code').forEach(c => {
    c.addEventListener('click', () => {
        const code = document.querySelector('.source-code');
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        c.classList.add('copy-sample-code--active');

        setTimeout(() => {
            c.classList.remove('copy-sample-code--active');
        }, 1000);
    });
});
```

### card / card.js
```javascript
// 0. Get originKey
getOriginKey().then(originKey => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        environment: 'test',
        originKey: originKey // Mandatory. originKey from Costumer Area
    });

    // 2. Create and mount the Component
    const card = checkout
        .create('card', {
            // Optional Configuration
            // hasHolderName: true,

            // Optional. Customize the look and feel of the payment form
            // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
            styles: {},

            // Optional. Define custom placeholders for the Card fields
            // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
            placeholders: {
                // encryptedCardNumber: '9999 9999 9999 9999',
                // encryptedExpiryDate: '01/22',
                // encryptedSecurityCode : '123'
            },

            // Optionally show a Pay Button
            showPayButton: true,

            // Events
            onSubmit: (state, component) => {
                if (state.isValid) {
                    makePayment(card.data);
                }
            },

            onChange: (state, component) => {
                // state.data;
                // state.isValid;

                updateStateContainer(state); // Demo purposes only
            }
        })
        .mount('#card-container');
});
```

## server/ - Server Side
```
├── node
│   ├── index.js
│   ├── api
│   │   ├── originKeys.js
│   │   ├── paymentMethods.js
│   │   └── payments.js
│   └── utils
│       ├── config.js
│       ├── getPostParameters.js
│       └── handleCallback.js
```

### index.js
```javascript
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const getPaymentMethods = require('./api/paymentMethods');
const getOriginKeys = require('./api/originKeys');
const makePayment = require('./api/payments');

module.exports = (() => {
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
    app.listen(port, () => console.log(`Listening on localhost:${port}`));
})();
```

### UTIL - config.js
```javascript
const { CHECKOUT_APIKEY, MERCHANT_ACCOUNT } = process.env;

const API_VERSION = 'v52';
const CHECKOUT_URL = `https://checkout-test.adyen.com/${API_VERSION}`;

module.exports = {
    CHECKOUT_APIKEY,
    CHECKOUT_URL,
    MERCHANT_ACCOUNT
};
```

### UTIL - getPostParameters.js
```javascript
const { CHECKOUT_APIKEY, CHECKOUT_URL, MERCHANT_ACCOUNT } = require('./config');

module.exports = (endpoint, request) => {
    const body = JSON.stringify({
        merchantAccount: MERCHANT_ACCOUNT,
        ...request
    });

    return {
        body,
        url: `${CHECKOUT_URL}/${endpoint}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-Api-Key': CHECKOUT_APIKEY
        }
    };
};

```

### UTIL - handleCallback.js
```javascript
module.exports = ({ error, response = {}, body }, res) => {
    if (error) {
        console.error(error);
        return res.send(error);
    }

    if (response.statusCode && response.statusMessage) {
        console.log(`Request to ${res.req.url} ended with status ${response.statusCode} - ${response.statusMessage}`);
    }

    res.send(body);
};
```

### API - originKeys.js
```javascript
onst { post } = require('request');
const { MERCHANT_ACCOUNT } = require('../utils/config');
const getPostParameters = require('../utils/getPostParameters');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const originDomains = [`${request.protocol}://${request.headers.host}`];
    const params = getPostParameters('originKeys', { originDomains });

    post(params, (err, response, body) => handleCallback({ err, response, body }, res));
};
```

### API - paymentMethods.js
```javascript
const { post } = require('request');
const getPostParameters = require('../utils/getPostParameters');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParameters('paymentMethods', request);

    post(params, (error, response, body) => handleCallback({ error, response, body }, res));
};
```

### API - payments.js
```javascript
const { post } = require('request');
const getPostParameters = require('../utils/getPostParameters');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParameters('/payments', request);

    post(params, (err, response, body) => handleCallback({ err, response, body }, res));
};
```
