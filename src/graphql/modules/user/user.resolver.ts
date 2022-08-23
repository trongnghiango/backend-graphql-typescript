import { ROLES } from "../../../constants/role.const";
import { onActivity } from "../../../events/onActivity.event";
import { AuthHelper, ErrorHelper, firebaseHelper, UtilsHelper } from "../../../helpers";
import { Context } from "../../context";
import { UserHelper } from "./user.helper";
import { IUser, UserModel, UserRole } from "./user.model";
import { userService } from "./user.service";

const Query = {
  getAllUser: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return userService.fetch(args.q);
  },
  getOneUser: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await userService.findOne({ _id: id });
  },
};

const Mutation = {
  updateUser: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    if (context.tokenData.role != ROLES.ADMIN) AuthHelper.isOwner(context, id);
    return await userService.updateOne(id, data).then(async (res: IUser) => {
      onActivity.next({
        username: context.tokenData.username || "",
        message: `Cập nhật người dùng`,
      });
      const userHelper = new UserHelper(res);
      return await userHelper.user.save();
    });
  },
  deleteOneUser: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await userService.deleteOne(id).then((res) => {
      onActivity.next({
        username: context.tokenData.username || "",
        message: `Xóa người dùng`,
      });
      return res;
    });
  },
};

const User = {
};

export default {
  Query,
  Mutation,
  User,
};
