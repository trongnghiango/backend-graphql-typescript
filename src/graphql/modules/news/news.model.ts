import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export enum NewsStatus {
  IMPORTANT = "IMPORTANT",
  DRAFT = "DRAFT",
}

export type INews = BaseDocument & {
  code?: string;
  title?: string;
  slug?: string;
  description?: string;
  sourceName?: string;
  sourceLink?: string;
  readmore?: string;
  content?: string;
};

const newsSchema = new Schema(
  {
    code: { type: String },
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    sourceName: { type: String },
    sourceLink: { type: String },
    readmore: { type: String },
    content: { type: String },
    isHotNews: { type: Boolean, default: false },
    status: { type: String, enum: NewsStatus, default: NewsStatus.DRAFT },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

// newsSchema.index({ name: "text" }, { weights: { name: 2 } });

export const NewsHook = new ModelHook<INews>(newsSchema);
export const NewsModel: mongoose.Model<INews> = MainConnection.model("News", newsSchema);

export const NewsLoader = ModelLoader<INews>(NewsModel, NewsHook);
