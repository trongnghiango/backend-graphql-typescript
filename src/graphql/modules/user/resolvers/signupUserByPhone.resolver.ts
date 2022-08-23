import { set } from "lodash";
import { encryptionHelper, ErrorHelper } from "../../../../helpers";
import { countries } from "../../../../helpers/countries.helper";
import { Context } from "../../../context";
import { UserHelper } from "../user.helper";
import { User, UserModel, UserRole, UserServiceStatus, UserStatus } from "../user.model";
const Mutation = {
  signupUserByPhone: async (root: any, args: any, context: Context) => {
    let { country, phonecode, phone } = args;
    const password = context.passwordToken;

    if (!phone) throw ErrorHelper.badToken();

    const existedUser = await UserModel.findOne({ phone });
    if (existedUser) {
      throw ErrorHelper.userExisted();
    }

    const existedCountry = countries.find(ctr => ctr.country === country && ctr.postcode === phonecode);
    if (!existedCountry) {
      throw ErrorHelper.requestDataInvalid("country - phonecode");
    }

    const code = await UserHelper.generateCode();

    const params: User = {
      code,
      phone,
      role: UserRole.MEMBER,
      status: UserStatus.ACTIVE,
      activedAt: new Date(),
      serviceStatus: UserServiceStatus.FREE,
      balance: 0,
      point: 0,
      referralCode: await UserHelper.generateReferalCode(code),
    }

    const user = new UserModel(params);

    const hashPassword = encryptionHelper.createPassword(password, user.id);
    set(user, "password", hashPassword);

    await user.save();

    delete user.password;

    return {
      user,
      token: new UserHelper(user).getToken(),
    };
  },
};

export default { Mutation };
