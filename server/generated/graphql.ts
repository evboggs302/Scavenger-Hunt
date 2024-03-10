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

export type AuthPayload = {
  __typename: 'AuthPayload';
  token: Scalars['String'];
};

export type CluePayload = {
  __typename: 'CluePayload';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  hunt_id: Scalars['ID'];
  order_number?: Maybe<Scalars['Int']>;
  responses?: Maybe<Array<Maybe<ResponsePayload>>>;
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

export type DeleteTeamInput = {
  team_id: Scalars['ID'];
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
  clues?: Maybe<Array<CluePayload>>;
  created_by: Scalars['ID'];
  created_date?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  recall_message?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Team>>;
};

export type LoginInput = {
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  createHunt?: Maybe<Hunt>;
  createMultipleClues?: Maybe<Array<Maybe<CluePayload>>>;
  createMultipleTeams?: Maybe<Array<Maybe<Team>>>;
  createSingleClue?: Maybe<Array<Maybe<CluePayload>>>;
  createSingleTeam?: Maybe<Array<Maybe<Team>>>;
  deleteAllCluesByHuntId?: Maybe<Scalars['Boolean']>;
  deleteAllResponsesByHunt?: Maybe<Scalars['Boolean']>;
  deleteAllResponsesByTeam?: Maybe<Scalars['Boolean']>;
  deleteClueById?: Maybe<Scalars['Boolean']>;
  deleteTeam?: Maybe<Scalars['Boolean']>;
  login: AuthPayload;
  logout?: Maybe<Scalars['Boolean']>;
  markResponseCorrect?: Maybe<Scalars['Boolean']>;
  registerUser: AuthPayload;
  sendHint?: Maybe<Scalars['Boolean']>;
  updateClueDescription?: Maybe<CluePayload>;
  updateClueOrder?: Maybe<Array<Maybe<CluePayload>>>;
  updateTeam?: Maybe<Array<Maybe<Team>>>;
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


export type MutationDeleteAllCluesByHuntIdArgs = {
  hunt_id: Scalars['ID'];
};


export type MutationDeleteAllResponsesByHuntArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAllResponsesByTeamArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClueByIdArgs = {
  clue_id: Scalars['ID'];
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkResponseCorrectArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterUserArgs = {
  input: AddUserInput;
};


export type MutationSendHintArgs = {
  input: SendHintInput;
};


export type MutationUpdateClueDescriptionArgs = {
  input: UpdateClueDescriptionInput;
};


export type MutationUpdateClueOrderArgs = {
  input: UpdateClueOrderInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

export type Query = {
  __typename: 'Query';
  getAllUsers?: Maybe<Array<Maybe<UserPayload>>>;
  getCluesByHuntId?: Maybe<Array<Maybe<CluePayload>>>;
  getHuntsByUserId?: Maybe<Array<Maybe<Hunt>>>;
  getResponsesByClue?: Maybe<Array<Maybe<ResponsePayload>>>;
  getResponsesByHunt?: Maybe<Array<Maybe<ResponsePayload>>>;
  getResponsesByTeam?: Maybe<Array<Maybe<ResponsePayload>>>;
  getSingleUser?: Maybe<UserPayload>;
  getTeamsByHuntId?: Maybe<Array<Maybe<Team>>>;
  logout: Scalars['Boolean'];
  userNameExists: Scalars['Boolean'];
};


export type QueryGetCluesByHuntIdArgs = {
  id: Scalars['String'];
};


export type QueryGetResponsesByClueArgs = {
  id: Scalars['ID'];
};


export type QueryGetResponsesByHuntArgs = {
  id: Scalars['ID'];
};


export type QueryGetResponsesByTeamArgs = {
  id: Scalars['ID'];
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

export type SendHintInput = {
  hint_body: Scalars['String'];
  response_id: Scalars['ID'];
  team_id: Scalars['ID'];
};

export type SingleTeamInput = {
  device_number?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Team = {
  __typename: 'Team';
  _id: Scalars['ID'];
  device_number: Scalars['String'];
  hunt_id: Scalars['ID'];
  last_clue_sent?: Maybe<Scalars['Int']>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  recall_sent?: Maybe<Scalars['Boolean']>;
};

export type UpdateClueDescriptionInput = {
  clue_id: Scalars['ID'];
  newDescription: Scalars['String'];
};

export type UpdateClueOrderInput = {
  hunt_id: Scalars['ID'];
  newOrder: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateTeamInput = {
  device_number?: InputMaybe<Scalars['String']>;
  hunt_id: Scalars['ID'];
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  team_id: Scalars['ID'];
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
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  CluePayload: ResolverTypeWrapper<CluePayload>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CluesListItem: CluesListItem;
  CreateHuntInput: CreateHuntInput;
  CreateMultTeamsInput: CreateMultTeamsInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  DeleteTeamInput: DeleteTeamInput;
  FullUser: ResolverTypeWrapper<FullUser>;
  Hunt: ResolverTypeWrapper<Hunt>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ResponsePayload: ResolverTypeWrapper<ResponsePayload>;
  SendHintInput: SendHintInput;
  SingleTeamInput: SingleTeamInput;
  Team: ResolverTypeWrapper<Team>;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateTeamInput: UpdateTeamInput;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserInput: AddUserInput;
  String: Scalars['String'];
  AuthPayload: AuthPayload;
  CluePayload: CluePayload;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  CluesListItem: CluesListItem;
  CreateHuntInput: CreateHuntInput;
  CreateMultTeamsInput: CreateMultTeamsInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  DeleteTeamInput: DeleteTeamInput;
  FullUser: FullUser;
  Hunt: Hunt;
  Boolean: Scalars['Boolean'];
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  ResponsePayload: ResponsePayload;
  SendHintInput: SendHintInput;
  SingleTeamInput: SingleTeamInput;
  Team: Team;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateTeamInput: UpdateTeamInput;
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

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CluePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CluePayload'] = ResolversParentTypes['CluePayload']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType>;
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
  clues?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType>;
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
  createMultipleClues?: Resolver<Maybe<Array<Maybe<ResolversTypes['CluePayload']>>>, ParentType, ContextType, RequireFields<MutationCreateMultipleCluesArgs, 'input'>>;
  createMultipleTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<MutationCreateMultipleTeamsArgs, 'input'>>;
  createSingleClue?: Resolver<Maybe<Array<Maybe<ResolversTypes['CluePayload']>>>, ParentType, ContextType, RequireFields<MutationCreateSingleClueArgs, 'input'>>;
  createSingleTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<MutationCreateSingleTeamArgs, 'input'>>;
  deleteAllCluesByHuntId?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAllCluesByHuntIdArgs, 'hunt_id'>>;
  deleteAllResponsesByHunt?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByHuntArgs, 'id'>>;
  deleteAllResponsesByTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByTeamArgs, 'id'>>;
  deleteClueById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteClueByIdArgs, 'clue_id'>>;
  deleteTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  markResponseCorrect?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMarkResponseCorrectArgs, 'id'>>;
  registerUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  sendHint?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendHintArgs, 'input'>>;
  updateClueDescription?: Resolver<Maybe<ResolversTypes['CluePayload']>, ParentType, ContextType, RequireFields<MutationUpdateClueDescriptionArgs, 'input'>>;
  updateClueOrder?: Resolver<Maybe<Array<Maybe<ResolversTypes['CluePayload']>>>, ParentType, ContextType, RequireFields<MutationUpdateClueOrderArgs, 'input'>>;
  updateTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPayload']>>>, ParentType, ContextType>;
  getCluesByHuntId?: Resolver<Maybe<Array<Maybe<ResolversTypes['CluePayload']>>>, ParentType, ContextType, RequireFields<QueryGetCluesByHuntIdArgs, 'id'>>;
  getHuntsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hunt']>>>, ParentType, ContextType>;
  getResponsesByClue?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType, RequireFields<QueryGetResponsesByClueArgs, 'id'>>;
  getResponsesByHunt?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType, RequireFields<QueryGetResponsesByHuntArgs, 'id'>>;
  getResponsesByTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType, RequireFields<QueryGetResponsesByTeamArgs, 'id'>>;
  getSingleUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<QueryGetSingleUserArgs, 'uid'>>;
  getTeamsByHuntId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryGetTeamsByHuntIdArgs, 'h_id'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userNameExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryUserNameExistsArgs, 'user_name'>>;
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
  device_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_clue_sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  recall_sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CluePayload?: CluePayloadResolvers<ContextType>;
  FullUser?: FullUserResolvers<ContextType>;
  Hunt?: HuntResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponsePayload?: ResponsePayloadResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
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
    