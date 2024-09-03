import stripe

stripe.api_key = 'your-secret-key'

def create_payment_intent(amount):
    payment_intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='usd',
        payment_method_types=['card']
    )
    return payment_intent
