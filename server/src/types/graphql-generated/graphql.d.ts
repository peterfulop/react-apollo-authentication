import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  success: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
};

export type ConfirmPayload = {
  __typename?: 'ConfirmPayload';
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
  userErrors: Array<UserError>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetUserPayload = {
  __typename?: 'GetUserPayload';
  user: Maybe<User>;
  userErrors: Array<UserError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Maybe<Scalars['Boolean']>;
  confirmResend: AuthPayload;
  confirmUser: ConfirmPayload;
  signin: ConfirmPayload;
  signup: AuthPayload;
};


export type MutationConfirmResendArgs = {
  email: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationSigninArgs = {
  input: CredentialsInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  _: Maybe<Scalars['Boolean']>;
  getMyProfile: GetUserPayload;
  getUser: GetUserPayload;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type SignupInput = {
  credentials: CredentialsInput;
  name: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  confirmed: Maybe<Scalars['Boolean']>;
  createdAt: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Maybe<Scalars['String']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  values: Maybe<Array<Maybe<Scalars['String']>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConfirmPayload: ResolverTypeWrapper<ConfirmPayload>;
  CredentialsInput: CredentialsInput;
  GetUserPayload: ResolverTypeWrapper<GetUserPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserError: ResolverTypeWrapper<UserError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  ConfirmPayload: ConfirmPayload;
  CredentialsInput: CredentialsInput;
  GetUserPayload: GetUserPayload;
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  SignupInput: SignupInput;
  String: Scalars['String'];
  Subscription: {};
  User: User;
  UserError: UserError;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  success: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfirmPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfirmPayload'] = ResolversParentTypes['ConfirmPayload']> = {
  token: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetUserPayload'] = ResolversParentTypes['GetUserPayload']> = {
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  confirmResend: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationConfirmResendArgs, 'email'>>;
  confirmUser: Resolver<ResolversTypes['ConfirmPayload'], ParentType, ContextType, RequireFields<MutationConfirmUserArgs, 'token'>>;
  signin: Resolver<ResolversTypes['ConfirmPayload'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  signup: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  getMyProfile: Resolver<ResolversTypes['GetUserPayload'], ParentType, ContextType>;
  getUser: Resolver<ResolversTypes['GetUserPayload'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  confirmed: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload: AuthPayloadResolvers<ContextType>;
  ConfirmPayload: ConfirmPayloadResolvers<ContextType>;
  GetUserPayload: GetUserPayloadResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserError: UserErrorResolvers<ContextType>;
};

