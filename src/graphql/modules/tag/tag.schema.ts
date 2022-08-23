import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllTag(q: QueryGetListInput): TagPageData
    getOneTag(id: ID!): Tag
    # Add Query
  }

  extend type Mutation {
    createTag(data: CreateTagInput!): Tag
    updateTag(id: ID!, data: UpdateTagInput!): Tag
    deleteOneTag(id: ID!): Tag
    # Add Mutation
  }

  input CreateTagInput {
    name: String
  }

  input UpdateTagInput {
    name: String
  }

  type Tag {
    id: String    
    createdAt: DateTime
    updatedAt: DateTime

    name: String
  }

  type TagPageData {
    data: [Tag]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
