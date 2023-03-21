const pool = require("../config/db.js");
const CartItemsModel = require("../models/cartItemsModel.js");
const OrderItemsModel = require("../models/orderItemsModel.js");
const OrdersModel = require("../models/ordersModel.js");
const StripeController = require("./stripeController.js");

const CheckoutController = {
  initiate: async (req, res) => {
    try {
      const { cartItems, userId } = req.body;
      if (!cartItems) return res.status(400).json("No item to process");
      if (!userId) return res.status(400).json("Could not get user Id");

      //Getting necessary products info from their ids
      const productIds = cartItems.map((cartItem) => cartItem.product_id);
      const products = await pool.query(
        "SELECT * FROM products WHERE id = ANY($1)",
        [productIds]
      );

      //Need to format the products object to send to stripe properly
      const lineItems = await Promise.all(
        cartItems.map(async (cartItem) => {
          const product = products.rows.find(
            (product) => product.id === cartItem.product_id
          );
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: product.price * 100, //Stripe uses cents
            },
            quantity: cartItem.quantity,
          };
        })
      );

      //Calling the Stripe controller with the right parameters that will issue a payment link
      const paymentUrl = await StripeController.createPayment(
        userId,
        lineItems
      );
      res.json({ url: paymentUrl });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  process: async (req, res) => {
    try {
      //Getting payment info from Stripe controller
      const payload = req.body;
      console.log(payload);
      const sig = req.headers["stripe-signature"];
      const paymentInfo = await StripeController.getPaymentInfo(payload, sig);
      const {
        paymentIntent,
        paymentStatus,
        payment_id,
        amountReceived,
        user_id,
      } = paymentInfo;
      if (paymentStatus !== "succeeded")
        return res
          .status(401)
          .json(`Payment unsuccessful: ${paymentIntent.status}`);

      //Creating new order
      const newOrderId = await OrdersModel.create(
        user_id,
        amountReceived,
        payment_id
      );

      //Get current cart items
      const currentCartItems = await CartItemsModel.getAll(user_id);

      //Populate OrderItems with Cart Items
      await currentCartItems.map((item) =>
        OrderItemsModel.create(newOrderId, item.product_id, item.quantity)
      );

      //Empty the cart
      await CartItemsModel.deleteAll(user_id);

      res.status(200).json("New order created!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = CheckoutController;
