import { Types } from "mongoose";
import { AccountModel } from "../../models/accounts";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { deleteTwilioSubAccount } from "../../utils/twilioActions/deleteTwilioSubAccount";
import { deleteStripeCustomer } from "../../utils/stripeActions/customerManagement/deleteStripeCustomer";

export const deleteCustomerVendorAccounts = async (userId: Types.ObjectId) => {
  try {
    const usersAccount = await AccountModel.findOne({
      user: userId,
    }).exec();

    if (!usersAccount) {
      return throwResolutionError({
        location: "deleteCustomerVendorAccounts",
        message: "Unable to find the user account.",
      });
    }

    const { _id, stripe_customer_id, twilio_account_sid } = usersAccount;
    await Promise.all([
      deleteStripeCustomer(stripe_customer_id),
      deleteTwilioSubAccount(twilio_account_sid),
    ]);

    const { deletedCount } = await AccountModel.deleteOne({ _id }).exec();

    return deletedCount === 1;
  } catch (err) {
    return throwResolutionError({
      location: "deleteCustomerVendorAccounts",
      message: "Unable to delete customer vendor accounts.",
      err,
    });
  }
};
