import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  baseUrl: process.env.PAYPHI_BASE_URL || 'https://qa.phicommerce.com',
  salePath: process.env.PAYPHI_SALE_PATH || '/pg/api/v2/initiateSale',
  hmacKey: process.env.PAYPHI_HMAC_KEY || 'replace-with-shared-secret',
  merchantId: process.env.MERCHANT_ID || '',
} as const;
