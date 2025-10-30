import express from 'express';
import morgan from 'morgan';
import { config } from './config.js';
import { initiateSale } from './payphi.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'payphi-initiatesale-node', time: new Date().toISOString() });
});

// Initiate sale (Direct mode). Pass the fields you need in the body.
app.post('/api/initiate-sale', async (req, res) => {
  try {
    const data = await initiateSale(req.body);
    res.status(200).json(data);
  } catch (err: any) {
    const status = err?.response?.status || 500;
    res.status(status).json({
      error: true,
      message: err?.response?.data || err?.message || 'Unknown error',
    });
  }
});

// Example returnURL endpoint for redirect flows
app.post('/payphi/return', (req, res) => {
  // PayPhi may POST form-urlencoded here; mount urlencoded parser if needed.
  res.json({ received: true, note: 'Handle return data & verify secureHash here.' });
});

// Example payment advice endpoint (server-to-server)
app.post('/payphi/advice', (req, res) => {
  // PayPhi will push advice notifications; verify secureHash and update order state.
  res.json({ received: true });
});

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
