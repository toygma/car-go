import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Stripe from "stripe";
import Booking from "../models/booking.model";
import dotenv from "dotenv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
dotenv.config();
export const stripeCheckoutSession = catchAsyncErrors(
  async (bookingId: string) => {
    const booking = await Booking.findById(bookingId).populate("car");

    if (!booking || !booking.car) {
      throw new Error("Booking or car not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(booking.amount.total * 100),
            product_data: {
              name: booking.car.name,
              description: booking.car.description,
              images: [booking.car.images[0].url],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/me/bookings`,
      cancel_url: `${process.env.FRONTEND_URL}/car/${booking.car.id}`,
      client_reference_id: booking.id,
      customer_email: booking.customer.email,
    });

    return { url: session?.url };
  }
);

export const webhookHandler = catchAsyncErrors(
  async (signature: string, rawBody: string) => {
    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const bookingId = session.client_reference_id;

        const paymentInfo = {
          id: session.payment_intent,
          status: session.payment_status,
          method: session.payment_method_types[0],
        };

        await Booking.findByIdAndUpdate(bookingId, {
          paymentInfo,
        });
        return true;
      }
    } catch (error: any) {
      console.log("Error in stripe webhook checkout", error.message);
    }
  }
);
