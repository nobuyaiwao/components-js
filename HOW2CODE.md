# Structure
## Files
```
server/
src/
node_modules/
```

## src/
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

## server/
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


