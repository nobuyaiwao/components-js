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
├── utils.js
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


