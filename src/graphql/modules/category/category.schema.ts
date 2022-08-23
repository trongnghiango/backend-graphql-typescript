import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCategory(q: QueryGetListInput): CategoryPageData
    getOneCategory(id: ID!): Category
    # Add Query
  }

  extend type Mutation {
    createCategory(data: CreateCategoryInput!): Category
    updateCategory(id: ID!, data: UpdateCategoryInput!): Category
    deleteOneCategory(id: ID!): Category
    # Add Mutation
  }

  input CreateCategoryInput {
    name: String
    slug: String
    description: String
  }

  input UpdateCategoryInput {
    name: String
    slug: String
    description: String
  }

  type Category {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    name: String
    slug: String
    description: String
  }

  type CategoryPageData {
    data: [Category]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
