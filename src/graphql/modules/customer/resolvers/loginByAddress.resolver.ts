import { ROLES } from "../../../../constants/role.const";
import { encryptionHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { CustomerHelper } from "../customer.helper";
import { Customer, CustomerModel, CustomerStatus, customerWalletTypeData } from "../customer.model";
import Web3 from "web3";

const Mutation = {
  loginByAddress: async (root: any, args: any, context: Context) => {
    let { address, walletType, addressIp } = args;
    if (!customerWalletTypeData.includes(walletType)) {
      throw ErrorHelper.requestDataInvalid("Wallet type");
    }

    if (!addressIp) {
      throw ErrorHelper.permissionDeny();
    }

    if (!Web3.utils.isAddress(address)) {
      throw ErrorHelper.requestDataInvalid("Address");
    }

    let customer = await CustomerModel.findOne({ address, walletType });

    if (!customer) {
      const data: Customer = {
        address,
        walletType,
        activedAt: new Date(),
        role: ROLES.CUSTOMER,
        nonce: await CustomerHelper.generateNonce(address),
        addressIp,
        verifyCode: await CustomerHelper.generateReferalCode(address),
      };
      customer = await CustomerModel.create(data);
    } else {
      if (customer.status === CustomerStatus.DEACTIVED) {
        throw ErrorHelper.permissionDeny();
      }

      customer.addressIp = addressIp;
      await customer.save();
    }

    return {
      customer,
      token: new CustomerHelper(customer).getToken(),
    };
  },
};

export default { Mutation };
