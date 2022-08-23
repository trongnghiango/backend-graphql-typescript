import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  TRUST = "TRUST",
  MATH = "MATH",
  TOKEN_POCKET = "TOKEN_POCKET",
  WALLET_CONNECT = "WALLET_CONNECT",
  BINANCE_CHAIN = "BINANCE_CHAIN",
}

export const customerWalletTypeData = [
  "METAMASK",
  "TRUST",
  "MATH",
  "TOKEN_POCKET",
  "WALLET_CONNECT",
  "BINANCE_CHAIN",
];

export type Customer = {
  username?: string;
  address?: string;
  walletType?: CustomerWalletType;
  email?: string;
  verifyCode?: string;
  referral?: string;
  shortUrl?: string;
  activedAt?: Date;
  role?: string;
  nonce?: string;
  addressIp?: string; // address
  unClaimCount?: number;
  status?: CustomerStatus;
};

export type ICustomer = BaseDocument & Customer;

const customerSchema = new Schema(
  {
    username: { type: String },
    address: { type: String }, // dia chi vi
    walletType: { type: String, enum: CustomerWalletType },
    email: { type: String },
    verifyCode: { type: String },
    activedAt: { type: Date },
    referral: { type: String },
    shortUrl: { type: String },
    role: { type: String },
    nonce: { type: String },
    addressIp: { type: String },
    unClaimCount: { type: Number, default: 0 },
    status: { type: String, enum: CustomerStatus, default: CustomerStatus.ACTIVE },
  },
  { timestamps: true }
);

// customerSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CustomerHook = new ModelHook<ICustomer>(customerSchema);
export const CustomerModel: mongoose.Model<ICustomer> = MainConnection.model(
  "Customer",
  customerSchema
);

export const CustomerLoader = ModelLoader<ICustomer>(CustomerModel, CustomerHook);
