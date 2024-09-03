const express = require('express');
const { createPaymentIntent } = require('./stripe');
const app = express();

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await createPaymentIntent(amount);
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
