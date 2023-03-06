const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

const StripeController = {

  createPayment: async (userId, lineItems) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
          user_id: userId, // replace with the actual user ID
        },
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.CLIENT_URL}/orders/success`, //redirecting to this route in case of success and passing the id to handle order history
        cancel_url: `${process.env.CLIENT_URL}/cart_items`, // Can make something more customized later with error message for customer
      });
      const paymentUrl = session.url;
      return paymentUrl;
    } catch (error) {
      console.error(error.message);
    }
  },

  getPaymentInfo: async (payload, sig) => {
    try {
      let event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      // Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        // Retrieve the session and include payment details by expanding payment_intent.
        const sessionWithPaymentIntent = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["payment_intent"],
          }
        );

        const paymentIntent= sessionWithPaymentIntent.payment_intent;

        const paymentInfo = {
          paymentStatus: paymentIntent.status,
          payment_id: paymentIntent.id,
          amountReceived: paymentIntent.amount_received / 100, // convert from cents to dollars
          user_id: session.metadata.user_id,
        }

        return paymentInfo;
      }
    } catch (err) {
      console.log(err);
      console.error(error.message);
    }
  },

};

module.exports = StripeController;
