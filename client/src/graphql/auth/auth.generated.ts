/* eslint-disable */
import * as Types from '../../apollo/graphql-generated/types';

import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
const defaultOptions = {} as const;
export type SignupMutationVariables = Types.Exact<{
  input: Types.SignupInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'AuthPayload';
    success?: boolean | null;
    userErrors: Array<{
      __typename?: 'UserError';
      message: string;
      values?: Array<string | null> | null;
    }>;
  };
};

export type ConfirmUserMutationVariables = Types.Exact<{
  confirmUserToken: Types.Scalars['String'];
}>;

export type ConfirmUserMutation = {
  __typename?: 'Mutation';
  confirmUser: {
    __typename?: 'ConfirmPayload';
    token?: string | null;
    userErrors: Array<{
      __typename?: 'UserError';
      message: string;
      values?: Array<string | null> | null;
    }>;
    user?: {
      __typename?: 'User';
      id: string;
      email: string;
      name: string;
    } | null;
  };
};

export type ConfirmResendMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type ConfirmResendMutation = {
  __typename?: 'Mutation';
  confirmResend: {
    __typename?: 'AuthPayload';
    success?: boolean | null;
    userErrors: Array<{
      __typename?: 'UserError';
      message: string;
      values?: Array<string | null> | null;
    }>;
  };
};

export type SigninMutationVariables = Types.Exact<{
  signinInput: Types.CredentialsInput;
}>;

export type SigninMutation = {
  __typename?: 'Mutation';
  signin: {
    __typename?: 'ConfirmPayload';
    token?: string | null;
    userErrors: Array<{
      __typename?: 'UserError';
      message: string;
      values?: Array<string | null> | null;
    }>;
    user?: {
      __typename?: 'User';
      id: string;
      email: string;
      name: string;
    } | null;
  };
};

export const SignupDocument = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      userErrors {
        message
        values
      }
      success
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($confirmUserToken: String!) {
    confirmUser(token: $confirmUserToken) {
      userErrors {
        message
        values
      }
      token
      user {
        id
        email
        name
      }
    }
  }
`;
export type ConfirmUserMutationFn = Apollo.MutationFunction<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      confirmUserToken: // value for 'confirmUserToken'
 *   },
 * });
 */
export function useConfirmUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(
    ConfirmUserDocument,
    options
  );
}
export type ConfirmUserMutationHookResult = ReturnType<
  typeof useConfirmUserMutation
>;
export type ConfirmUserMutationResult =
  Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export const ConfirmResendDocument = gql`
  mutation ConfirmResend($email: String!) {
    confirmResend(email: $email) {
      userErrors {
        message
        values
      }
      success
    }
  }
`;
export type ConfirmResendMutationFn = Apollo.MutationFunction<
  ConfirmResendMutation,
  ConfirmResendMutationVariables
>;

/**
 * __useConfirmResendMutation__
 *
 * To run a mutation, you first call `useConfirmResendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmResendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmResendMutation, { data, loading, error }] = useConfirmResendMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmResendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmResendMutation,
    ConfirmResendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmResendMutation,
    ConfirmResendMutationVariables
  >(ConfirmResendDocument, options);
}
export type ConfirmResendMutationHookResult = ReturnType<
  typeof useConfirmResendMutation
>;
export type ConfirmResendMutationResult =
  Apollo.MutationResult<ConfirmResendMutation>;
export type ConfirmResendMutationOptions = Apollo.BaseMutationOptions<
  ConfirmResendMutation,
  ConfirmResendMutationVariables
>;
export const SigninDocument = gql`
  mutation Signin($signinInput: CredentialsInput!) {
    signin(input: $signinInput) {
      userErrors {
        message
        values
      }
      token
      user {
        id
        email
        name
      }
    }
  }
`;
export type SigninMutationFn = Apollo.MutationFunction<
  SigninMutation,
  SigninMutationVariables
>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SigninMutation,
    SigninMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<
  SigninMutation,
  SigninMutationVariables
>;
