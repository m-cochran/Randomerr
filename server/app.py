from flask import Flask, request, jsonify
from stripe_service import create_payment_intent

app = Flask(__name__)

@app.route('/create-payment-intent', methods=['POST'])
def create_intent():
    data = request.json
    amount = data['amount']
    payment_intent = create_payment_intent(amount)
    return jsonify({'clientSecret': payment_intent.client_secret})

if __name__ == '__main__':
    app.run(port=3000)
