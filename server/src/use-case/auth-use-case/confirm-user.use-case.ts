import { ApolloContext } from '../../apollo';
import { config } from '../../config/config';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTSign, JWTVerify } from '../../helpers/jwt';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  ConfirmPayload,
  MutationConfirmUserArgs,
} from '../../types/graphql-generated/graphql';

export type ConfirmUserInput = {
  args: MutationConfirmUserArgs;
  context: ApolloContext;
};

export const confirmUserUseCase = async (
  input: ConfirmUserInput
): Promise<ConfirmPayload> => {
  const { token } = input.args;
  const { prisma } = input.context;

  const authPayload: ConfirmPayload = {
    token: null,
    user: null,
    userErrors: [],
  };

  const user = JWTVerify(token);

  if (!user) {
    return {
      ...authPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.AUTHORIZATION_FAILED,
          values: [DBErrorMessages.EXPIRED_TOKEN],
        },
      ],
    };
  }

  const userById = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userById) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const newToken = JWTSign({
    userId: userById.id,
    email: userById.email,
    expiresIn: config.cookie.sessiontokenExp,
  });

  try {
    const confirmedUser = await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        confirmed: true,
      },
    });
    return {
      ...authPayload,
      token: newToken,
      user: {
        ...confirmedUser,
        createdAt: new Date(confirmedUser.createdAt).toLocaleDateString(),
        updatedAt: new Date(confirmedUser.updatedAt).toLocaleDateString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...authPayload,
      userErrors,
    };
  }
};
