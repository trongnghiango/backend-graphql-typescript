import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MEMBER = "MEMBER"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE"
}

export enum UserServiceStatus {
  FREE = "FREE",
  EXPIRED = "EXPIRED",
  PAID = "PAID"
}

export type User = {
  code?: string;
  name?: string;
  email?: string;
  from?: string;
  fromName?: string;
  password?: string;
  agencyName?: string;
  agencySlug?: string;
  logo?: string;
  role?: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  balance?: number;
  point?: number;
  serviceStatus?: UserServiceStatus;
  lastLoginAt?: Date;
  activedAt?: Date;
  referralCode?: string;
  expiredDateCount?: number;
  status?: UserStatus;
  serviceId?: string;
  serviceHistoryId?: string;
  serviceCode?: string;
};

export type IUser = BaseDocument & User;

const userSchema = new Schema(
  {
    code: { type: String },
    name: { type: String },
    email: { type: String },
    from: { type: String },
    fromName: { type: String },
    password: { type: String },
    agencyName: { type: String },
    agencySlug: { type: String },
    walletAddress: {type: String},
    logo: { type: String },
    role: { type: String, enum: Object.values(UserRole) },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
    balance: { type: Number, default: 0 },
    point: { type: Number, default: 0 },
    serviceStatus: { type: String, enum: Object.values(UserServiceStatus) },
    lastLoginAt: { type: Date },
    activedAt: { type: Date },
    referralCode: { type: String },
    expiredDateCount: { type: Number, default: 30 },
    status: { type: String, enum: Object.values(UserStatus) },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    serviceHistoryId: { type: Schema.Types.ObjectId, ref: "ServiceHistory" },
    serviceCode: { type: String },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

userSchema.index({ code: 1 }, { unique: true });
userSchema.index({ name: "text" }, { weights: { name: 10 } });

export const UserHook = new ModelHook<IUser>(userSchema);
export const UserModel: mongoose.Model<IUser> = MainConnection.model("User", userSchema);

export const UserLoader = ModelLoader<IUser>(UserModel, UserHook);
