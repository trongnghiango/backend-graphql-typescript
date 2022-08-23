import { ROLES } from "../../../constants/role.const";
import { AuthHelper, ErrorHelper } from "../../../helpers";
import { Context } from "../../context";
import { categoryService } from "./category.service";

const Query = {
  getAllCategory: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    return categoryService.fetch(args.q);
  },
  getOneCategory: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await categoryService.findOne({ _id: id });
  },
};

const Mutation = {
  createCategory: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { data } = args;
    return await categoryService.create(data);
  },
  updateCategory: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id, data } = args;
    return await categoryService.updateOne(id, data);
  },
  deleteOneCategory: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await categoryService.deleteOne(id);
  },
};

const Category = {};

export default {
  Query,
  Mutation,
  Category,
};
