import stripe
import os

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def create_payment_intent(amount):
    payment_intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='usd',
        payment_method_types=['card']
    )
    return payment_intent
