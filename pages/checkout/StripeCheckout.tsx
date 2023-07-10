import CheckoutForm from '@/components/CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function StripeCheckout() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.NEXT_PUBLIC_SECRET_KEY,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};