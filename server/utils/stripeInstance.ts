import Stripe from "stripe";
import config from "@/config";

const { STRIPE_SECRET_KEY } = config;
export const stripeInstance = new Stripe(STRIPE_SECRET_KEY);
