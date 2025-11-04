import axios from 'axios';
import { config } from './config.js';
import { computeSecureHash } from './hash.js';

export type PayPhiTransactionType = 'SALE' | 'PREAUTH';

export interface InitiateSaleBody {
  merchantId?: string;
  merchantTxnNo: string;
  amount?: string;
  currencyCode: string;          // '356' for INR
  payType: 0 | 1;
  customerEmailID: string;
  transactionType: PayPhiTransactionType;
  paymentMode?: 'CARD' | 'NB' | 'WALLET' | 'UPI' | 'AADHAAR' | 'GOOGLEPAY' | 'NACH';
  returnURL?: string;
  txnDate?: string;

  // Card
  cardNo?: string;
  cardExpiry?: string;           // YYYYMM
  nameOnCard?: string;
  cvv?: string;

  // UPI
  customerUPIAlias?: string;

  // Misc
  addlParam1?: string;
  addlParam2?: string;
  customerMobileNo?: string;
  customerName?: string;
}

export async function initiateSale(data: InitiateSaleBody) {
  const body: Record<string, unknown> = {
    merchantId: data.merchantId || config.merchantId,
    merchantTxnNo: data.merchantTxnNo,
    amount: data.amount,
    currencyCode: data.currencyCode,
    payType: data.payType,
    customerEmailID: data.customerEmailID,
    transactionType: data.transactionType,
    paymentMode: data.paymentMode,
    returnURL: data.returnURL,
    txnDate: data.txnDate,

    cardNo: data.cardNo,
    cardExpiry: data.cardExpiry,
    nameOnCard: data.nameOnCard,
    cvv: data.cvv,

    customerUPIAlias: data.customerUPIAlias,

    addlParam1: data.addlParam1,
    addlParam2: data.addlParam2,
    customerMobileNo: data.customerMobileNo,
    customerName: data.customerName,
  };

 
  body['secureHash'] = computeSecureHash(body, config.hmacKey);

  const url = `${config.baseUrl}${config.salePath}`;

  const requestConfig = {
    headers: { 'Content-Type': 'application/json' },
    // timeout can be adjusted
    timeout: 20000,
  };

  // Log full request details
  console.log('\n=== REQUEST ===');
  console.log('Method:', 'POST');
  console.log('URL:', url);
  console.log('Headers:', JSON.stringify(requestConfig.headers, null, 2));
  console.log('Body:', JSON.stringify(body, null, 2));
  console.log('================\n');

  const resp = await axios.post(url, body, requestConfig);

  // Log full response details
  console.log('\n=== RESPONSE ===');
  console.log('Status:', resp.status);
  console.log('Status Text:', resp.statusText);
  console.log('Headers:', JSON.stringify(resp.headers, null, 2));
  console.log('Data:', JSON.stringify(resp.data, null, 2));
  console.log('================\n');

  return resp.data;
}
