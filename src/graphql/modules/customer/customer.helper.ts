import { ROLES } from "../../../constants/role.const";
import { ErrorHelper, KeycodeHelper } from "../../../helpers";
import { TokenHelper } from "../../../helpers/token.helper";
import { Context } from "../../context";
import { counterService } from "../counter/counter.service";
import { CustomerModel, CustomerStatus, ICustomer } from "./customer.model";

export class CustomerHelper {
  constructor(public customer: ICustomer) {}

  static async fromContext(context: Context) {
    if (!ROLES.CUSTOMER.includes(context.tokenData.role)) return null;
    const customer = await CustomerModel.findById(context.tokenData._id);
    if (!customer) throw ErrorHelper.permissionDeny();
    return new CustomerHelper(customer);
  }

  setActivedAt() {
    if (this.customer.status === CustomerStatus.ACTIVE && !this.customer.activedAt) {
      this.customer.activedAt = new Date();
    }
    return this;
  }

  static generateCode() {
    return counterService.trigger("user").then((c) => "U" + c);
  }

  static async generateReferalCode(secret: string) {
    let referralCode = KeycodeHelper.alpha(secret, 5);
    let countCode = await CustomerModel.countDocuments({ referralCode });
    while (countCode > 0) {
      referralCode = KeycodeHelper.alpha(secret, 5);
      countCode = await CustomerModel.countDocuments({ referralCode });
    }
    return referralCode;
  }

  static async generateNonce(secret: string) {
    let nonce = KeycodeHelper.alpha(secret, 10);
    let countCode = await CustomerModel.countDocuments({ nonce });
    while (countCode > 0) {
      nonce = KeycodeHelper.alpha(secret, 10);
      countCode = await CustomerModel.countDocuments({ nonce });
    }
    return nonce;
  }

  getToken() {
    return TokenHelper.generateToken({
      role: this.customer.role,
      _id: this.customer._id,
      username: this.customer.username,
      status: this.customer.status,
    });
  }
}
