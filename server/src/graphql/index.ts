import { authTypeDefs } from './auth/auth.schema';
import { userTypeDefs } from './user/user.schema';

import { authGQLResolver } from '../graphql/auth/auth.resolver';
import { userGQLResolver } from '../graphql/user/user.resolver';

const BASE_TYPE_DEF = `#graphql
 type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type UserError {
    message: String!
    values: [String]
  }

`;

export const typeDefs = [BASE_TYPE_DEF, userTypeDefs, authTypeDefs];

const { Query: userQueries } = userGQLResolver;
const { Mutation: authMutations } = authGQLResolver;

export const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...authMutations,
  },
};
