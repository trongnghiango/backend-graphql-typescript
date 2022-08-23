import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { tagService } from "./tag.service";

const Query = {
  getAllTag: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    return tagService.fetch(args.q);
  },
  getOneTag: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await tagService.findOne({ _id: id });
  },
};

const Mutation = {
  createTag: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { data } = args;
    return await tagService.create(data);
  },
  updateTag: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id, data } = args;
    return await tagService.updateOne(id, data);
  },
  deleteOneTag: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await tagService.deleteOne(id);
  },
};

const Tag = {
  
};

export default {
  Query,
  Mutation,
  Tag,
};
