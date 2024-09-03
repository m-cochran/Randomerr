const express = require('./libs/express/express');
const bodyParser = require('./libs/body-parser/body-parser');
const Stripe = require('./libs/stripe/index');
const stripe = Stripe('sk_test_51PulULDDaepf7cji2kqbdFVOzF37bS8RrtgO8dpVBpT1m8AXZhcyIBAAf42VOcpE8auFxbm1xSjglmBhvaIYaRck00QkUGMkpF'); // Replace with your Stripe secret key

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    try {
        const { token } = req.body;

        const charge = await stripe.charges.create({
            amount: 5000, // Amount in cents ($50.00)
            currency: 'usd',
            description: 'Example charge',
            source: token,
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
