import { ErrorHelper } from "../../../../helpers";
import { encryptionHelper, firebaseHelper, UtilsHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { UserHelper } from "../user.helper";
import { UserModel } from "../user.model";
const Mutation = {
  signinUserByPhone: async (root: any, args: any, context: Context) => {
    let { phone } = args;
    const password = context.passwordToken;

    // console.log('------> phone', phone);

    if (!phone) throw ErrorHelper.badToken();
    const user = await UserModel.findOne({ phone });

    if (!user) {
      throw ErrorHelper.userNotExist();
    }

    const validPassword = encryptionHelper.comparePassword(password, user.id, user.password);

    if (!validPassword) {
      throw ErrorHelper.userPasswordNotCorrect();
    }

    delete user.password;

    return {
      user,
      token: new UserHelper(user).getToken(),
    };
  },
};

export default { Mutation };
