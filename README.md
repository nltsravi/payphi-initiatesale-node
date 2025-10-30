# PayPhi initiateSale – Standalone Node (TypeScript + Express)

Minimal, production-ready starter to call PayPhi **initiateSale** (Direct mode) with proper `secureHash` (HMAC-SHA256).

## Quick start

```bash
pnpm i   # or: npm i / yarn
cp .env.example .env  # set your values
pnpm dev # or: npm run dev
```

The server starts at `http://localhost:4000` (or `PORT` env).

### Key endpoints

- `POST /api/initiate-sale`  
  Body (JSON): at minimum:
  ```json
  {
    "merchantTxnNo": "TXN20251026A001",
    "amount": "499.00",
    "currencyCode": "356",
    "payType": 1,
    "customerEmailID": "guest@phicommerce.com",
    "transactionType": "SALE",
    "paymentMode": "UPI",
    "customerUPIAlias": "name@bank",
    "returnURL": "http://localhost:4000/payphi/return"
  }
  ```

- `POST /payphi/return`  
  Example `returnURL` handler for browser/redirect flows.

- `POST /payphi/advice`  
  Example **payment advice** handler (server-to-server notifications).

## Notes

- The spec lists two possible sale paths: `/pg/api/sale` and `/pg/api/v2/initiateSale`. Keep it configurable via `PAYPHI_SALE_PATH` and confirm which one your tenant uses.
- `secureHash` is computed by **sorting parameter names ascending**, **concatenating non-empty values**, then HMAC-SHA256 with your shared key (lowercase hex).

## Build

```bash
pnpm build && pnpm start
```
