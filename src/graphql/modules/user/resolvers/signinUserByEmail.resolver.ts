
import { encryptionHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { UserHelper } from "../user.helper";
import { UserModel } from "../user.model";
const Mutation = {
  signinUserByEmail: async (root: any, args: any, context: Context) => {
    let { email } = args;
    const password = context.passwordToken;
    // console.log('------> phone', phone);

    const user = await UserModel.findOne({ email });

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
