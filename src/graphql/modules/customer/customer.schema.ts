import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCustomer(q: QueryGetListInput): CustomerPageData
    getOneCustomer(id: ID!): Customer
    customerGetMe: Customer
    # Add Query
  }

  extend type Mutation {
    updateCustomer(id: ID!, data: UpdateCustomerInput!): Customer
    deleteOneCustomer(id: ID!): Customer
    loginByAddress(address: String!, walletType: String!, addressIp: String!): CustomerLoginData
    customerUpdateMe(data: CustomerUpdateMeInput!): Customer
  }

  type CustomerLoginData {
    customer: Customer
    token: String
  }
  input CustomerUpdateMeInput {
    referral: String!
  }

  input UpdateCustomerInput {
    status: String
  }

  type Customer {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    username: String
    address: String
    balanceBNB: Float
    balanceATHER: Float
    email: String
    verifyCode: String
    walletType: String
    status: String
    referral: String
    shortUrl: String
    nonce: String
  }

  type CustomerPageData {
    data: [Customer]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
