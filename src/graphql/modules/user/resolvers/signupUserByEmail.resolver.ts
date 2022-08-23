import { set } from "lodash";
import md5 from "md5";
import { encryptionHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { UserHelper } from "../user.helper";
import { User, UserModel, UserRole, UserServiceStatus, UserStatus } from "../user.model";
const Mutation = {
  signupUserByEmail: async (root: any, args: any, context: Context) => {
    let { email, password } = args;
    // const password = context.passwordToken;
    console.log({password});
    const existedUser = await UserModel.findOne({ email });

    if (existedUser) {
      throw ErrorHelper.userExisted();
    }

    const code = await UserHelper.generateCode();

    const params: User = {
      code,
      email: email,
      role: UserRole.MEMBER,
      status: UserStatus.ACTIVE,
      activedAt: new Date(),
      serviceStatus: UserServiceStatus.FREE,
      referralCode: await UserHelper.generateReferalCode(code),
      balance: 0,
      point: 0,
    }

    const user = new UserModel(params);
    const pass = md5(password).toString()
    const hashPassword = encryptionHelper.createPassword(pass, user.id);
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
