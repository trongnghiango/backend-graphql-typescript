import { ROLES } from "../../../../constants/role.const";
import { AuthHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { CustomerModel } from "../customer.model";
import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";

const Query = {
  customerGetMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.CUSTOMER]);
    const sig = context.sigToken;

    if (!sig) {
      throw ErrorHelper.badToken();
    }

    const customer = await CustomerModel.findById(context.tokenData._id);

    const nonceCode = process.env.NONCE_CODE;
    const msg = `${nonceCode} ${customer.nonce}`;

    const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig,
    });

    // console.log("address.toLowerCase()", address.toLowerCase());

    // console.log("customer.address.toLowerCase()", customer.address.toLowerCase());

    if (address.toLowerCase() !== customer.address.toLowerCase())
      throw ErrorHelper.error("Signature verification failed");

    return customer;
  },
};

export default {
  Query,
};
