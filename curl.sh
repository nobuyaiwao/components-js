#!/bin/sh

curl https:/checkout-test.adyen.com/v51/paymentMethods \
-H "x-API-key: AQEyhmfxLo/JYhZEw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZinFziP7eh81X6VPylhwbL0IQwV1bDb7kfNy1WIxIIkxgBw==-P0fsTdJtfItAU6POtaZObNDTJSVvm7749vgZ7dBXQ8M=-whdeW3vA2N6wvhtL" \
-H "content-type: application/json" \
-d '{
  "merchantAccount": "NobuyaIwaoCOM",
  "countryCode": "CN",
  "amount": {
    "currency": "CNY",
    "value": 10
  },
  "channel": "Web"
}' | jq .
