import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  GetUserPayload,
  QueryGetUserArgs,
} from '../../types/graphql-generated/graphql';

export type GetUserInput = {
  args: QueryGetUserArgs;
  context: ApolloContext;
};

export const getUserUseCase = async (
  input: GetUserInput
): Promise<GetUserPayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  if (!user?.userId) {
    return {
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
      user: null,
    };
  }
  const userResult = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return {
    userErrors: [],
    user: userResult,
  } as GetUserPayload;
};
