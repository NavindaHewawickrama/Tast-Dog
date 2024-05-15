import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        // Handle the case when CardElement is null
        return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: {
                // Include any additional billing details you want to collect from the user
                name: 'John Doe',
            },
        },
    });

    if (error) {
      console.error(error);
      window.alert('Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      window.alert('Payment successful');
      // You can add further actions here upon successful payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;