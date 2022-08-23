import { ROLES } from "../../../../constants/role.const";
import { AuthHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { UserModel, UserStatus } from "../user.model";

const Query = {
  userGetShop: async (root: any, args: any, context: Context) => {
    const user = await UserModel.findOne({
      referralCode: context.shopToken,
      status: UserStatus.ACTIVE
    }, { password: -1, });
    
    if(!user){
      throw ErrorHelper.badToken();
    }

    return user;
  },
};

export default {
  Query,
};
