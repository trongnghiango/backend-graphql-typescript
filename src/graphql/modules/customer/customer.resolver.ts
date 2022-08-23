import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { customerService } from "./customer.service";

const Query = {
  getAllCustomer: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    return customerService.fetch(args.q);
  },
  getOneCustomer: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await customerService.findOne({ _id: id });
  },
};

const Mutation = {
  updateCustomer: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id, data } = args;
    return await customerService.updateOne(id, data);
  },
  deleteOneCustomer: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await customerService.deleteOne(id);
  },
};

const Customer = {
};

export default {
  Query,
  Mutation,
  Customer,
};
