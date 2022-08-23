import { ROLES } from "../../../../constants/role.const";
import { AuthHelper, ErrorHelper } from "../../../../helpers";
import { createShortUrl } from "../../../../helpers/shortUrl.helper";
import { Context } from "../../../context";
import { CustomerModel, CustomerStatus } from "../customer.model";

const Mutation = {
  customerUpdateMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.CUSTOMER]);
    const { data } = args;
    const existedCustomer = await CustomerModel.findById(context.tokenData._id);

    if (existedCustomer.status === CustomerStatus.DEACTIVED) {
      throw ErrorHelper.permissionDeny();
    }
    if (existedCustomer.referral) {
      throw ErrorHelper.requestDataInvalid("referral");
    }

    if (data.referral.length > 10) {
      throw ErrorHelper.requestDataInvalid("referral");
    }

    const createdUrl = await createShortUrl(`https://test.athersphere.com/?ref=${data.referral}`);

    console.log("createdUrl", createdUrl);

    return await CustomerModel.findByIdAndUpdate(context.tokenData._id, {
      referral: data.referral,
      shortUrl:createdUrl.url,
    });
  },
};

export default {
  Mutation,
};
