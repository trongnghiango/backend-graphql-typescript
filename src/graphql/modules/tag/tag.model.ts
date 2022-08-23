import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ITag = BaseDocument & {
  name?: string;
  slug?: string[];
  description?: string;
};

const tagSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

// tagSchema.index({ name: "text" }, { weights: { name: 2 } });

export const TagHook = new ModelHook<ITag>(tagSchema);
export const TagModel: mongoose.Model<ITag> = MainConnection.model(
  "Tag",
  tagSchema
);

export const TagLoader = ModelLoader<ITag>(TagModel, TagHook);
