import crypto from 'crypto';

/**
 * Compute secureHash per PayPhi:
 * - Sort parameter NAMES ascending.
 * - Concatenate VALUES for params that are present and non-empty.
 * - HMAC-SHA256 with merchant key, lowercase hex digest.
 */
export function computeSecureHash(payload: Record<string, unknown>, key: string): string {
  const entries = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && String(v) !== '')
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  const concatenatedValues = entries.map(([, v]) => String(v)).join('');
  return crypto.createHmac('sha256', key).update(concatenatedValues, 'utf8').digest('hex');
}
