export const userTypeDefs = `#graphql
  extend type Query {
    getUser(id: ID!): GetUserPayload!
    getMyProfile: GetUserPayload!
  }

   type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
    confirmed: Boolean
  }

   type GetUserPayload {
    userErrors: [UserError!]!
    user: User
  }

`;
