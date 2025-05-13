// import { QueryResolvers } from "generated/graphql";
// import { fetchStripeSubscription } from "../../utils/stripeActions/fetchStripeSubscription";
// import { throwResolutionError } from "../../utils/apolloErrorHandlers";
// import { AccountModel } from "../../models/accounts";
// import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";

// export const fetchPaymentIntents: QueryResolvers["fetchStripePaymentIntents"] =
//   async (_parent: unknown, _args, { user }, { operation: { name } }) => {
//     try {
//       const user_id = createBsonObjectId(user._id);
//       const account = await AccountModel.findOne({ user: user_id }).exec();

//       if (!account) {
//         throw new Error("No account found.");
//       }

//       const sub = await fetch(account.stripe_customer_id);
//       const productId =
//         typeof sub.items.data[0].price.product === "string"
//           ? sub.items.data[0].price.product
//           : sub.items.data[0].price.product.id;

//       return {
//         __typename: "StripeSubscription",
//         id: sub.id,
//         description: sub.description,
//         status: sub.status,
//         priceId: sub.items.data[0].price.id,
//         productId,
//       };
//     } catch (err) {
//       return throwResolutionError({
//         location: name?.value,
//         message: "Unable to fetch your subscription.",
//         err,
//       });
//     }
//   };
