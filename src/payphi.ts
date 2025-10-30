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

  console.log('\t\t\tbody--------->', body);
  body['secureHash'] = computeSecureHash(body, config.hmacKey);

  const url = `${config.baseUrl}${config.salePath}`;

  console.log('\t\t\tbody after' , body);
  const resp = await axios.post(url, body, {
    headers: { 'Content-Type': 'application/json' },
    // timeout can be adjusted
    timeout: 20000,
  });
 
  return resp.data;
}
