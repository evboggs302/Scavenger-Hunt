import { deleteStripeCustomer } from "@utils/stripeActions/customerManagement/deleteStripeCustomer";
import { AccountModel } from "@models/accounts";
import { UserModel } from "@models/users";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { createStripeCustomer } from "@utils/stripeActions/customerManagement/createStripeCustomer";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { createTwilioSubAccount } from "@utils/twilioActions/createTwilioSubAccount";
import { deleteTwilioSubAccount } from "@utils/twilioActions/deleteTwilioSubAccount";

type CreateCustomerVendorAccountsArgs = {
  fullName: string;
  email: string;
  userId: string;
};

/**
 * @description
 * Creates the following and updates the appropriate user:
 * - Stripe customer
 * - Twilio sub-account
 * - Account Document in MongoDB
 * @param fullName - The full name of the user.
 * @param email - The email of the user.
 * @param userId - The ID of the user.
 * @returns The account ID, Stripe customer ID, and subscription ID.
 * @throws An error if any of the operations fail.
 */
export const createCustomerVendorAccounts = async ({
  fullName,
  email,
  userId,
}: CreateCustomerVendorAccountsArgs) => {
  let stripeCustomerId: string = "";
  let twilioAccountSid: string = "";

  const acct_id = createBsonObjectId();
  const user_id = createBsonObjectId(userId);

  try {
    const customerId = await createStripeCustomer(fullName, email).then(
      (res) => {
        stripeCustomerId = res;
        return res;
      }
    );

    const { account_sid } = await createTwilioSubAccount(
      acct_id.toString()
    ).then((res) => {
      twilioAccountSid = res.account_sid;
      return res;
    });

    await AccountModel.create({
      _id: acct_id,
      user: user_id,
      stripe_customer_id: customerId,
      twilio_account_sid: account_sid,
    }).catch(async (err) => {
      await deleteStripeCustomer(stripeCustomerId);
      await deleteTwilioSubAccount(twilioAccountSid);
      throw new Error(`Unable to save account info: ${err}`);
    });

    await UserModel.updateOne({ _id: user_id }, { account: acct_id })
      .exec()
      .catch(async (err) => {
        await AccountModel.deleteOne({ _id: acct_id }).exec();
        await deleteStripeCustomer(stripeCustomerId);
        await deleteTwilioSubAccount(twilioAccountSid);
        throw new Error(`Unable to update user with account info: ${err}`);
      });

    return {
      account_id: acct_id,
      customerId: stripeCustomerId,
    };
  } catch (err) {
    console.log({ err });
    return throwResolutionError({
      location: "createCustomerVendorAccounts",
      message: "Unable to create customer vendor accounts.",
      err,
    });
  }
};
