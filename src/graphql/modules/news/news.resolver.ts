import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { newsService } from "./news.service";

const Query = {
  getAllNews: async (root: any, args: any, context: Context) => {
    // context.auth(ROLES.ADMIN_MEMBER);
    return newsService.fetch(args.q);
  },
  getOneNews: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await newsService.findOne({ _id: id });
  },
};

const Mutation = {
  createNews: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { data } = args;
    return await newsService.create(data);
  },
  updateNews: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id, data } = args;
    return await newsService.updateOne(id, data);
  },
  deleteOneNews: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_MEMBER);
    const { id } = args;
    return await newsService.deleteOne(id);
  },
};

const News = {
  
};

export default {
  Query,
  Mutation,
  News,
};
