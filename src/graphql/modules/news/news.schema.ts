import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllNews(q: QueryGetListInput): NewsPageData
    getOneNews(id: ID!): News
    # Add Query
  }

  extend type Mutation {
    createNews(data: CreateNewsInput!): News
    updateNews(id: ID!, data: UpdateNewsInput!): News
    deleteOneNews(id: ID!): News
    # Add Mutation
  }

  input CreateNewsInput {
    name: String
  }

  input UpdateNewsInput {
    name: String
  }

  type News {
    id: String    
    createdAt: DateTime
    updatedAt: DateTime

    name: String
  }

  type NewsPageData {
    data: [News]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
