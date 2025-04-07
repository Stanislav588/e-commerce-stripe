import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createCheckOutSession = async (req, res) => {
  try {
    const { products, coupon } = req.body;
    const lineItems = products.map((product) => {
      let taxPercentage = 13;
      let totalAmount = 0;
      const amount = Math.round(
        Number((product.product.price * taxPercentage) / 100)
      );
      if (!amount) {
        return res.status(403).json({
          message: "Invalid price",
        });
      }
      let itemTotal = amount * product.quantity;
      totalAmount += itemTotal;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.product.brand,
            images: Array.isArray(product.product.img)
              ? product.product.img
              : [product.product.img],
          },
          unit_amount: product.product.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      automatic_tax: { enabled: true },
      success_url: "http://localhost:5173/order-success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        userId: req.userId,
        appliedCoupon: "None",
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create session",
    });
  }
};
