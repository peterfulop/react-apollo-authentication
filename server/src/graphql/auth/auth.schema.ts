export const authTypeDefs = `#graphql
 extend type Mutation {
    signup(input:SignupInput!):AuthPayload!
    signin(input:CredentialsInput!):ConfirmPayload!
    confirmUser(token:String!):ConfirmPayload!
    confirmResend(email:String!):AuthPayload!
  }

  input SignupInput {
    name: String!
    credentials:CredentialsInput!
    passwordConfirm: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    success: Boolean
  }

  type ConfirmPayload {
    userErrors: [UserError!]!
    user: User
    token: String
  }
`;
