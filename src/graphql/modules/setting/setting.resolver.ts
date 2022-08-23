import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { settingService } from "./setting.service";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { SettingGroupLoader } from "../settingGroup/settingGroup.model";
import { set } from "lodash";
import { EditMode } from "./setting.model";

const Query = {
  getAllSetting: async (root: any, args: any, context: Context) => {
    if (context.isAdmin) {
      set(args, "q.filter.isPrivate", false);
    }
    return settingService.fetch(args.q);
  },
  getOneSetting: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await settingService.findOne({ _id: id });
  },
  getOneSettingByKey: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { key } = args;
    return await settingService.findOne({ key: key });
  },
};

const Mutation = {
  createSetting: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { data } = args;
    set(data, "editMode", EditMode.USER);
    return await settingService.create(data);
  },
  updateSetting: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { id, data } = args;
    // console.log('data', data);
    return await settingService.updateOne(id, data);
  },
  deleteOneSetting: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await settingService.deleteOne(id);
  },
  deleteManySetting: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER);
    const { ids } = args;
    let result = await settingService.deleteMany(ids);
    return result;
  },
};

const Setting = {
  group: GraphQLHelper.loadById(SettingGroupLoader, "groupId"),
};

export default {
  Query,
  Mutation,
  Setting,
};
