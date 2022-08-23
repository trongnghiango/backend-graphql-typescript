import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ICategory = BaseDocument & {
  name?: string;
  slug?: string;
  description?: string;
};

const categorySchema = new Schema(
  {
    name: { type: String }, // ẩm thực
    description: { type: String },
    slug: { type: String }, // am-thuc-1231231
  },
  { timestamps: true }
);

// categorySchema.index({ name: "text" }, { weights: { name: 2 } });

export const CategoryHook = new ModelHook<ICategory>(categorySchema);
export const CategoryModel: mongoose.Model<ICategory> = MainConnection.model(
  "Category",
  categorySchema
);

export const CategoryLoader = ModelLoader<ICategory>(CategoryModel, CategoryHook);
