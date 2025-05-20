// import Stripe from "stripe";
// import { stripeInstance } from "../../stripeInstance";
// import { throwResolutionError } from "../../apolloErrorHandlers";
// import { fetchStripeSubscriptionPriceObject } from "../subscriptions/fetchStripeSubscriptionPriceObject";

// export const createPaymentIntent = async (
//   customerId: string,
//   confirmationtokenId: string
// ) => {
//   try {
//     // fetch price
//     const price = await fetchStripeSubscriptionPriceObject();

//     // Use PaymentIntent instead
//     const { client_secret, customer, payment_method } =
//       await stripeInstance.paymentIntents.create({
//         customer: customerId,
//         confirmation_token: confirmationtokenId,
//         setup_future_usage: "off_session",
//         currency: "usd",
//         amount: price.unit_amount || 0,
//         expand: ["customer", "payment_method"],
//       });

//     return {
//       clientSecret: client_secret,
//       paymentMethod: payment_method as Stripe.PaymentMethod,
//       customer: customer as Stripe.Customer | Stripe.DeletedCustomer,
//     };
//   } catch (err) {
//     return throwResolutionError({
//       location: "createPaymentIntent",
//       message: "Unable to create the payment intent.",
//       err,
//     });
//   }
// };
