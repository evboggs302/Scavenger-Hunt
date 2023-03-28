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

export type AddUserInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type Clue = {
  __typename: 'Clue';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  hunt_id: Scalars['ID'];
  order_number?: Maybe<Scalars['Int']>;
};

export type CluesListItem = {
  description: Scalars['String'];
  order_number: Scalars['Int'];
};

export type CreateHuntInput = {
  created_by: Scalars['String'];
  end_date: Scalars['String'];
  name: Scalars['String'];
  start_date: Scalars['String'];
};

export type CreateMultTeamsInput = {
  h_id: Scalars['String'];
  teams: Array<InputMaybe<SingleTeamInput>>;
};

export type CreateMultipleCluesInput = {
  cluesList: Array<InputMaybe<CluesListItem>>;
  h_id: Scalars['String'];
};

export type CreateSingleClueInput = {
  clueItem: CluesListItem;
  h_id: Scalars['String'];
};

export type CreateSingleTeamInput = {
  device_number: Scalars['String'];
  h_id: Scalars['String'];
  members: Array<InputMaybe<Scalars['String']>>;
};

export type FullUser = {
  __typename: 'FullUser';
  _id: Scalars['ID'];
  first_name: Scalars['String'];
  hash: Scalars['String'];
  last_name: Scalars['String'];
  user_name: Scalars['String'];
};

export type Hunt = {
  __typename: 'Hunt';
  _id: Scalars['ID'];
  clues?: Maybe<Array<Clue>>;
  created_by: Scalars['ID'];
  created_date?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  recall_message?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Team>>;
};

export type Mutation = {
  __typename: 'Mutation';
  createHunt?: Maybe<Hunt>;
  createMultipleClues?: Maybe<Array<Maybe<Clue>>>;
  createMultipleTeams?: Maybe<Array<Maybe<Team>>>;
  createSingleClue?: Maybe<Array<Maybe<Clue>>>;
  createSingleTeam?: Maybe<Array<Maybe<Team>>>;
  createUser?: Maybe<UserPayload>;
  login?: Maybe<Tokens>;
};


export type MutationCreateHuntArgs = {
  input: CreateHuntInput;
};


export type MutationCreateMultipleCluesArgs = {
  input: CreateMultipleCluesInput;
};


export type MutationCreateMultipleTeamsArgs = {
  input: CreateMultTeamsInput;
};


export type MutationCreateSingleClueArgs = {
  input: CreateSingleClueInput;
};


export type MutationCreateSingleTeamArgs = {
  input: CreateSingleTeamInput;
};


export type MutationCreateUserArgs = {
  input: AddUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  getAllUsers?: Maybe<Array<Maybe<UserPayload>>>;
  getCluesByHuntId?: Maybe<Array<Maybe<Clue>>>;
  getSingleUser?: Maybe<UserPayload>;
  getTeamsByHuntId?: Maybe<Array<Maybe<Team>>>;
  logout?: Maybe<Scalars['Boolean']>;
  userNameExists?: Maybe<Scalars['Boolean']>;
};


export type QueryGetCluesByHuntIdArgs = {
  id: Scalars['String'];
};


export type QueryGetSingleUserArgs = {
  uid: Scalars['ID'];
};


export type QueryGetTeamsByHuntIdArgs = {
  h_id: Scalars['ID'];
};


export type QueryUserNameExistsArgs = {
  user_name: Scalars['String'];
};

export type ResponsePayload = {
  __typename: 'ResponsePayload';
  _id: Scalars['ID'];
  clue_id: Scalars['String'];
  correct?: Maybe<Scalars['Boolean']>;
  hint_sent?: Maybe<Scalars['Boolean']>;
  response_txt?: Maybe<Scalars['String']>;
  team_id: Scalars['String'];
  time_received?: Maybe<Scalars['String']>;
};

export type SingleTeamInput = {
  device_number?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Team = {
  __typename: 'Team';
  _id: Scalars['ID'];
  device_number?: Maybe<Scalars['String']>;
  hunt_id: Scalars['String'];
  last_clue_sent?: Maybe<Scalars['Int']>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  recall_sent?: Maybe<Scalars['Boolean']>;
};

export type Tokens = {
  __typename: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  /** u_id is the id of the associated user */
  u_id: Scalars['ID'];
  u_name: Scalars['String'];
};

export type UserPayload = {
  __typename: 'UserPayload';
  _id: Scalars['ID'];
  first_name: Scalars['String'];
  hunts?: Maybe<Array<Hunt>>;
  last_name: Scalars['String'];
  user_name: Scalars['String'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
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
  AddUserInput: AddUserInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Clue: ResolverTypeWrapper<Clue>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CluesListItem: CluesListItem;
  CreateHuntInput: CreateHuntInput;
  CreateMultTeamsInput: CreateMultTeamsInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  FullUser: ResolverTypeWrapper<FullUser>;
  Hunt: ResolverTypeWrapper<Hunt>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ResponsePayload: ResolverTypeWrapper<ResponsePayload>;
  SingleTeamInput: SingleTeamInput;
  Team: ResolverTypeWrapper<Team>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserInput: AddUserInput;
  String: Scalars['String'];
  Clue: Clue;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  CluesListItem: CluesListItem;
  CreateHuntInput: CreateHuntInput;
  CreateMultTeamsInput: CreateMultTeamsInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  FullUser: FullUser;
  Hunt: Hunt;
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  ResponsePayload: ResponsePayload;
  SingleTeamInput: SingleTeamInput;
  Team: Team;
  Tokens: Tokens;
  UserPayload: UserPayload;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ClueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Clue'] = ResolversParentTypes['Clue']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullUser'] = ResolversParentTypes['FullUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HuntResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hunt'] = ResolversParentTypes['Hunt']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clues?: Resolver<Maybe<Array<ResolversTypes['Clue']>>, ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recall_message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHunt?: Resolver<Maybe<ResolversTypes['Hunt']>, ParentType, ContextType, RequireFields<MutationCreateHuntArgs, 'input'>>;
  createMultipleClues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<MutationCreateMultipleCluesArgs, 'input'>>;
  createMultipleTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<MutationCreateMultipleTeamsArgs, 'input'>>;
  createSingleClue?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<MutationCreateSingleClueArgs, 'input'>>;
  createSingleTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<MutationCreateSingleTeamArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'user_name'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPayload']>>>, ParentType, ContextType>;
  getCluesByHuntId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<QueryGetCluesByHuntIdArgs, 'id'>>;
  getSingleUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<QueryGetSingleUserArgs, 'uid'>>;
  getTeamsByHuntId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryGetTeamsByHuntIdArgs, 'h_id'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userNameExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryUserNameExistsArgs, 'user_name'>>;
};

export type ResponsePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponsePayload'] = ResolversParentTypes['ResponsePayload']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clue_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hint_sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  response_txt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  team_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time_received?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  device_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_clue_sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  recall_sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  u_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  u_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hunts?: Resolver<Maybe<Array<ResolversTypes['Hunt']>>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Clue?: ClueResolvers<ContextType>;
  FullUser?: FullUserResolvers<ContextType>;
  Hunt?: HuntResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponsePayload?: ResponsePayloadResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    