import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddUserInput = {
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type AuthPayload = AuthorizationError | InvalidInputError | NotFoundError | Token | UnknownError;

export type AuthorizationError = {
  __typename: 'AuthorizationError';
  _error_type_: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type BaseUser = {
  __typename: 'BaseUser';
  _id: Scalars['ID']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};

export type BaseUserPayload = AuthorizationError | BaseUser | InvalidInputError | NotFoundError | UnknownError;

export type Clue = {
  __typename: 'Clue';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hunt_id: Scalars['ID']['output'];
  order_number?: Maybe<Scalars['Int']['output']>;
  responses?: Maybe<Array<Maybe<Responses>>>;
};

export type CluePayload = AuthorizationError | Clue | InvalidInputError | NotFoundError | UnknownError;

export type CluesListItem = {
  description: Scalars['String']['input'];
  order_number: Scalars['Int']['input'];
};

export type CorrectResponse = {
  __typename: 'CorrectResponse';
  correct?: Maybe<Scalars['Boolean']['output']>;
};

export type CorrectResponsePayload = AuthorizationError | CorrectResponse | InvalidInputError | NotFoundError | UnknownError;

export type CreateHuntInput = {
  end_date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  start_date: Scalars['String']['input'];
};

export type CreateMultipleCluesInput = {
  cluesList: Array<InputMaybe<CluesListItem>>;
  h_id: Scalars['String']['input'];
};

export type CreateMultipleTeamsInput = {
  h_id: Scalars['String']['input'];
  teams: Array<InputMaybe<SingleTeam>>;
};

export type CreateSingleClueInput = {
  clueItem: CluesListItem;
  h_id: Scalars['String']['input'];
};

export type CreateSingleTeamInput = {
  device_number: Scalars['String']['input'];
  h_id: Scalars['String']['input'];
  members: Array<InputMaybe<Scalars['String']['input']>>;
};

export type Delete = {
  __typename: 'Delete';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteClues = AuthorizationError | Delete | InvalidInputError | NotFoundError | UnknownError;

export type DeleteHunt = AuthorizationError | Delete | InvalidInputError | NotFoundError | UnknownError;

export type DeleteResponses = AuthorizationError | Delete | InvalidInputError | NotFoundError | UnknownError;

export type DeleteTeam = AuthorizationError | Delete | InvalidInputError | NotFoundError | UnknownError;

export type DeleteTeamInput = {
  team_id: Scalars['ID']['input'];
};

export type HintPayload = AuthorizationError | HintSent | InvalidInputError | NotFoundError | UnknownError;

export type HintSent = {
  __typename: 'HintSent';
  sent?: Maybe<Scalars['Boolean']['output']>;
};

export type Hunt = {
  __typename: 'Hunt';
  _id: Scalars['ID']['output'];
  clues?: Maybe<Array<Clue>>;
  created_by: Scalars['ID']['output'];
  created_date?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['String']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  recall_message?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['String']['output']>;
  teams?: Maybe<Array<Team>>;
};

export type HuntPayload = AuthorizationError | Hunt | InvalidInputError | NotFoundError | UnknownError;

export type InvalidInputError = {
  __typename: 'InvalidInputError';
  _error_type_: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type Logout = {
  __typename: 'Logout';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LogoutPayload = AuthorizationError | InvalidInputError | Logout | NotFoundError | UnknownError;

export type Mutation = {
  __typename: 'Mutation';
  createHunt: HuntPayload;
  createMultipleClues?: Maybe<Array<CluePayload>>;
  createMultipleTeams?: Maybe<Array<TeamPayload>>;
  createSingleClue?: Maybe<Array<CluePayload>>;
  createSingleTeam: TeamPayload;
  deleteAllCluesByHuntId: DeleteClues;
  deleteAllResponsesByHunt: DeleteResponses;
  deleteAllResponsesByTeam: DeleteResponses;
  deleteClueById: DeleteClues;
  deleteHuntById: DeleteHunt;
  deleteTeam: DeleteTeam;
  login: AuthPayload;
  logout: LogoutPayload;
  markResponseCorrect: CorrectResponsePayload;
  registerUser: AuthPayload;
  sendHint: HintPayload;
  updateClueDescription: CluePayload;
  updateClueOrder?: Maybe<Array<CluePayload>>;
  updateHunt: HuntPayload;
  updateTeam: TeamPayload;
};


export type MutationCreateHuntArgs = {
  input: CreateHuntInput;
};


export type MutationCreateMultipleCluesArgs = {
  input: CreateMultipleCluesInput;
};


export type MutationCreateMultipleTeamsArgs = {
  input: CreateMultipleTeamsInput;
};


export type MutationCreateSingleClueArgs = {
  input: CreateSingleClueInput;
};


export type MutationCreateSingleTeamArgs = {
  input: CreateSingleTeamInput;
};


export type MutationDeleteAllCluesByHuntIdArgs = {
  hunt_id: Scalars['ID']['input'];
};


export type MutationDeleteAllResponsesByHuntArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAllResponsesByTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteClueByIdArgs = {
  clue_id: Scalars['ID']['input'];
};


export type MutationDeleteHuntByIdArgs = {
  h_id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkResponseCorrectArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateHuntArgs = {
  input: UpdateHuntInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

export type NotFoundError = {
  __typename: 'NotFoundError';
  _error_type_: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
  activateHunt: HuntPayload;
  deactivateHunt: HuntPayload;
  deleteAllHuntsByUser: DeleteHunt;
  getAllUsers: Array<Maybe<UserPayload>>;
  getCluesByHuntId?: Maybe<Array<CluePayload>>;
  getHunt: HuntPayload;
  getHuntsByUserId: Array<Maybe<HuntPayload>>;
  getResponsesByClue?: Maybe<Array<ResponsePayload>>;
  getResponsesByTeam?: Maybe<Array<ResponsePayload>>;
  getTeam: TeamPayload;
  getTeamsByHuntId?: Maybe<Array<TeamPayload>>;
  getUserFromToken: BaseUserPayload;
  userNameExists?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryActivateHuntArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeactivateHuntArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCluesByHuntIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetHuntArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetResponsesByClueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetResponsesByTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTeamsByHuntIdArgs = {
  h_id: Scalars['ID']['input'];
};


export type QueryGetUserFromTokenArgs = {
  tkn: Scalars['String']['input'];
};


export type QueryUserNameExistsArgs = {
  user_name: Scalars['String']['input'];
};

export type ResponsePayload = AuthorizationError | InvalidInputError | NotFoundError | Responses | UnknownError;

export type Responses = {
  __typename: 'Responses';
  _id: Scalars['ID']['output'];
  clue_id: Scalars['String']['output'];
  correct?: Maybe<Scalars['Boolean']['output']>;
  hint_sent?: Maybe<Scalars['Boolean']['output']>;
  response_txt?: Maybe<Scalars['String']['output']>;
  team_id: Scalars['String']['output'];
  time_received?: Maybe<Scalars['String']['output']>;
};

export type SendHintInput = {
  hint_body: Scalars['String']['input'];
  response_id: Scalars['ID']['input'];
  team_id: Scalars['ID']['input'];
};

export type SingleTeam = {
  device_number: Scalars['String']['input'];
  members?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Team = {
  __typename: 'Team';
  _id: Scalars['ID']['output'];
  device_number?: Maybe<Scalars['String']['output']>;
  hunt_id: Scalars['ID']['output'];
  last_clue_sent?: Maybe<Scalars['Int']['output']>;
  members?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  recall_sent?: Maybe<Scalars['Boolean']['output']>;
  responses?: Maybe<Array<ResponsePayload>>;
};

export type TeamPayload = AuthorizationError | InvalidInputError | NotFoundError | Team | UnknownError;

export type Token = {
  __typename: 'Token';
  _id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type UnknownError = {
  __typename: 'UnknownError';
  _error_type_: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type UpdateClueDescriptionInput = {
  clue_id: Scalars['ID']['input'];
  newDescription: Scalars['String']['input'];
};

export type UpdateClueOrderInput = {
  hunt_id: Scalars['ID']['input'];
  newOrder: Array<InputMaybe<Scalars['String']['input']>>;
};

export type UpdateHuntInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  hunt_id: Scalars['String']['input'];
  recall_message?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeamInput = {
  device_number?: InputMaybe<Scalars['String']['input']>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  team_id: Scalars['ID']['input'];
};

export type User = {
  __typename: 'User';
  _id: Scalars['ID']['output'];
  first_name: Scalars['String']['output'];
  hunts?: Maybe<Array<Hunt>>;
  last_name: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};

export type UserPayload = AuthorizationError | InvalidInputError | NotFoundError | UnknownError | User;

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  AuthPayload: ( AuthorizationError ) | ( InvalidInputError ) | ( NotFoundError ) | ( Token ) | ( UnknownError );
  BaseUserPayload: ( AuthorizationError ) | ( BaseUser ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  CluePayload: ( AuthorizationError ) | ( Clue ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  CorrectResponsePayload: ( AuthorizationError ) | ( CorrectResponse ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  DeleteClues: ( AuthorizationError ) | ( Delete ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  DeleteHunt: ( AuthorizationError ) | ( Delete ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  DeleteResponses: ( AuthorizationError ) | ( Delete ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  DeleteTeam: ( AuthorizationError ) | ( Delete ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  HintPayload: ( AuthorizationError ) | ( HintSent ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  HuntPayload: ( AuthorizationError ) | ( Hunt ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError );
  LogoutPayload: ( AuthorizationError ) | ( InvalidInputError ) | ( Logout ) | ( NotFoundError ) | ( UnknownError );
  ResponsePayload: ( AuthorizationError ) | ( InvalidInputError ) | ( NotFoundError ) | ( Responses ) | ( UnknownError );
  TeamPayload: ( AuthorizationError ) | ( InvalidInputError ) | ( NotFoundError ) | ( Omit<Team, 'responses'> & { responses?: Maybe<Array<RefType['ResponsePayload']>> } ) | ( UnknownError );
  UserPayload: ( AuthorizationError ) | ( InvalidInputError ) | ( NotFoundError ) | ( UnknownError ) | ( User );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddUserInput: AddUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AuthPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AuthPayload']>;
  AuthorizationError: ResolverTypeWrapper<AuthorizationError>;
  BaseUser: ResolverTypeWrapper<BaseUser>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BaseUserPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['BaseUserPayload']>;
  Clue: ResolverTypeWrapper<Clue>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CluePayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CluePayload']>;
  CluesListItem: CluesListItem;
  CorrectResponse: ResolverTypeWrapper<CorrectResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CorrectResponsePayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CorrectResponsePayload']>;
  CreateHuntInput: CreateHuntInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateMultipleTeamsInput: CreateMultipleTeamsInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  Delete: ResolverTypeWrapper<Delete>;
  DeleteClues: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteClues']>;
  DeleteHunt: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteHunt']>;
  DeleteResponses: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteResponses']>;
  DeleteTeam: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteTeam']>;
  DeleteTeamInput: DeleteTeamInput;
  HintPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HintPayload']>;
  HintSent: ResolverTypeWrapper<HintSent>;
  Hunt: ResolverTypeWrapper<Hunt>;
  HuntPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HuntPayload']>;
  InvalidInputError: ResolverTypeWrapper<InvalidInputError>;
  LoginInput: LoginInput;
  Logout: ResolverTypeWrapper<Logout>;
  LogoutPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LogoutPayload']>;
  Mutation: ResolverTypeWrapper<{}>;
  NotFoundError: ResolverTypeWrapper<NotFoundError>;
  Query: ResolverTypeWrapper<{}>;
  ResponsePayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ResponsePayload']>;
  Responses: ResolverTypeWrapper<Responses>;
  SendHintInput: SendHintInput;
  SingleTeam: SingleTeam;
  Team: ResolverTypeWrapper<Omit<Team, 'responses'> & { responses?: Maybe<Array<ResolversTypes['ResponsePayload']>> }>;
  TeamPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TeamPayload']>;
  Token: ResolverTypeWrapper<Token>;
  UnknownError: ResolverTypeWrapper<UnknownError>;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateHuntInput: UpdateHuntInput;
  UpdateTeamInput: UpdateTeamInput;
  User: ResolverTypeWrapper<User>;
  UserPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserPayload']>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserInput: AddUserInput;
  String: Scalars['String']['output'];
  AuthPayload: ResolversUnionTypes<ResolversParentTypes>['AuthPayload'];
  AuthorizationError: AuthorizationError;
  BaseUser: BaseUser;
  ID: Scalars['ID']['output'];
  BaseUserPayload: ResolversUnionTypes<ResolversParentTypes>['BaseUserPayload'];
  Clue: Clue;
  Int: Scalars['Int']['output'];
  CluePayload: ResolversUnionTypes<ResolversParentTypes>['CluePayload'];
  CluesListItem: CluesListItem;
  CorrectResponse: CorrectResponse;
  Boolean: Scalars['Boolean']['output'];
  CorrectResponsePayload: ResolversUnionTypes<ResolversParentTypes>['CorrectResponsePayload'];
  CreateHuntInput: CreateHuntInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateMultipleTeamsInput: CreateMultipleTeamsInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  Delete: Delete;
  DeleteClues: ResolversUnionTypes<ResolversParentTypes>['DeleteClues'];
  DeleteHunt: ResolversUnionTypes<ResolversParentTypes>['DeleteHunt'];
  DeleteResponses: ResolversUnionTypes<ResolversParentTypes>['DeleteResponses'];
  DeleteTeam: ResolversUnionTypes<ResolversParentTypes>['DeleteTeam'];
  DeleteTeamInput: DeleteTeamInput;
  HintPayload: ResolversUnionTypes<ResolversParentTypes>['HintPayload'];
  HintSent: HintSent;
  Hunt: Hunt;
  HuntPayload: ResolversUnionTypes<ResolversParentTypes>['HuntPayload'];
  InvalidInputError: InvalidInputError;
  LoginInput: LoginInput;
  Logout: Logout;
  LogoutPayload: ResolversUnionTypes<ResolversParentTypes>['LogoutPayload'];
  Mutation: {};
  NotFoundError: NotFoundError;
  Query: {};
  ResponsePayload: ResolversUnionTypes<ResolversParentTypes>['ResponsePayload'];
  Responses: Responses;
  SendHintInput: SendHintInput;
  SingleTeam: SingleTeam;
  Team: Omit<Team, 'responses'> & { responses?: Maybe<Array<ResolversParentTypes['ResponsePayload']>> };
  TeamPayload: ResolversUnionTypes<ResolversParentTypes>['TeamPayload'];
  Token: Token;
  UnknownError: UnknownError;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateHuntInput: UpdateHuntInput;
  UpdateTeamInput: UpdateTeamInput;
  User: User;
  UserPayload: ResolversUnionTypes<ResolversParentTypes>['UserPayload'];
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'InvalidInputError' | 'NotFoundError' | 'Token' | 'UnknownError', ParentType, ContextType>;
};

export type AuthorizationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorizationError'] = ResolversParentTypes['AuthorizationError']> = {
  _error_type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseUser'] = ResolversParentTypes['BaseUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseUserPayload'] = ResolversParentTypes['BaseUserPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'BaseUser' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type ClueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Clue'] = ResolversParentTypes['Clue']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Responses']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CluePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CluePayload'] = ResolversParentTypes['CluePayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Clue' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type CorrectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CorrectResponse'] = ResolversParentTypes['CorrectResponse']> = {
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CorrectResponsePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CorrectResponsePayload'] = ResolversParentTypes['CorrectResponsePayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'CorrectResponse' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type DeleteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Delete'] = ResolversParentTypes['Delete']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCluesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteClues'] = ResolversParentTypes['DeleteClues']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Delete' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type DeleteHuntResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteHunt'] = ResolversParentTypes['DeleteHunt']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Delete' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type DeleteResponsesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponses'] = ResolversParentTypes['DeleteResponses']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Delete' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type DeleteTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteTeam'] = ResolversParentTypes['DeleteTeam']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Delete' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type HintPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['HintPayload'] = ResolversParentTypes['HintPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'HintSent' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type HintSentResolvers<ContextType = any, ParentType extends ResolversParentTypes['HintSent'] = ResolversParentTypes['HintSent']> = {
  sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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

export type HuntPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['HuntPayload'] = ResolversParentTypes['HuntPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'Hunt' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type InvalidInputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidInputError'] = ResolversParentTypes['InvalidInputError']> = {
  _error_type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Logout'] = ResolversParentTypes['Logout']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutPayload'] = ResolversParentTypes['LogoutPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'InvalidInputError' | 'Logout' | 'NotFoundError' | 'UnknownError', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHunt?: Resolver<ResolversTypes['HuntPayload'], ParentType, ContextType, RequireFields<MutationCreateHuntArgs, 'input'>>;
  createMultipleClues?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<MutationCreateMultipleCluesArgs, 'input'>>;
  createMultipleTeams?: Resolver<Maybe<Array<ResolversTypes['TeamPayload']>>, ParentType, ContextType, RequireFields<MutationCreateMultipleTeamsArgs, 'input'>>;
  createSingleClue?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<MutationCreateSingleClueArgs, 'input'>>;
  createSingleTeam?: Resolver<ResolversTypes['TeamPayload'], ParentType, ContextType, RequireFields<MutationCreateSingleTeamArgs, 'input'>>;
  deleteAllCluesByHuntId?: Resolver<ResolversTypes['DeleteClues'], ParentType, ContextType, RequireFields<MutationDeleteAllCluesByHuntIdArgs, 'hunt_id'>>;
  deleteAllResponsesByHunt?: Resolver<ResolversTypes['DeleteResponses'], ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByHuntArgs, 'id'>>;
  deleteAllResponsesByTeam?: Resolver<ResolversTypes['DeleteResponses'], ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByTeamArgs, 'id'>>;
  deleteClueById?: Resolver<ResolversTypes['DeleteClues'], ParentType, ContextType, RequireFields<MutationDeleteClueByIdArgs, 'clue_id'>>;
  deleteHuntById?: Resolver<ResolversTypes['DeleteHunt'], ParentType, ContextType, RequireFields<MutationDeleteHuntByIdArgs, 'h_id'>>;
  deleteTeam?: Resolver<ResolversTypes['DeleteTeam'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['LogoutPayload'], ParentType, ContextType>;
  markResponseCorrect?: Resolver<ResolversTypes['CorrectResponsePayload'], ParentType, ContextType, RequireFields<MutationMarkResponseCorrectArgs, 'id'>>;
  registerUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  sendHint?: Resolver<ResolversTypes['HintPayload'], ParentType, ContextType, RequireFields<MutationSendHintArgs, 'input'>>;
  updateClueDescription?: Resolver<ResolversTypes['CluePayload'], ParentType, ContextType, RequireFields<MutationUpdateClueDescriptionArgs, 'input'>>;
  updateClueOrder?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<MutationUpdateClueOrderArgs, 'input'>>;
  updateHunt?: Resolver<ResolversTypes['HuntPayload'], ParentType, ContextType, RequireFields<MutationUpdateHuntArgs, 'input'>>;
  updateTeam?: Resolver<ResolversTypes['TeamPayload'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'input'>>;
};

export type NotFoundErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotFoundError'] = ResolversParentTypes['NotFoundError']> = {
  _error_type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activateHunt?: Resolver<ResolversTypes['HuntPayload'], ParentType, ContextType, RequireFields<QueryActivateHuntArgs, 'id'>>;
  deactivateHunt?: Resolver<ResolversTypes['HuntPayload'], ParentType, ContextType, RequireFields<QueryDeactivateHuntArgs, 'id'>>;
  deleteAllHuntsByUser?: Resolver<ResolversTypes['DeleteHunt'], ParentType, ContextType>;
  getAllUsers?: Resolver<Array<Maybe<ResolversTypes['UserPayload']>>, ParentType, ContextType>;
  getCluesByHuntId?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<QueryGetCluesByHuntIdArgs, 'id'>>;
  getHunt?: Resolver<ResolversTypes['HuntPayload'], ParentType, ContextType, RequireFields<QueryGetHuntArgs, 'id'>>;
  getHuntsByUserId?: Resolver<Array<Maybe<ResolversTypes['HuntPayload']>>, ParentType, ContextType>;
  getResponsesByClue?: Resolver<Maybe<Array<ResolversTypes['ResponsePayload']>>, ParentType, ContextType, RequireFields<QueryGetResponsesByClueArgs, 'id'>>;
  getResponsesByTeam?: Resolver<Maybe<Array<ResolversTypes['ResponsePayload']>>, ParentType, ContextType, RequireFields<QueryGetResponsesByTeamArgs, 'id'>>;
  getTeam?: Resolver<ResolversTypes['TeamPayload'], ParentType, ContextType, RequireFields<QueryGetTeamArgs, 'id'>>;
  getTeamsByHuntId?: Resolver<Maybe<Array<ResolversTypes['TeamPayload']>>, ParentType, ContextType, RequireFields<QueryGetTeamsByHuntIdArgs, 'h_id'>>;
  getUserFromToken?: Resolver<ResolversTypes['BaseUserPayload'], ParentType, ContextType, RequireFields<QueryGetUserFromTokenArgs, 'tkn'>>;
  userNameExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryUserNameExistsArgs, 'user_name'>>;
};

export type ResponsePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponsePayload'] = ResolversParentTypes['ResponsePayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'InvalidInputError' | 'NotFoundError' | 'Responses' | 'UnknownError', ParentType, ContextType>;
};

export type ResponsesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Responses'] = ResolversParentTypes['Responses']> = {
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
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_clue_sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  recall_sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<ResolversTypes['ResponsePayload']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamPayload'] = ResolversParentTypes['TeamPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'InvalidInputError' | 'NotFoundError' | 'Team' | 'UnknownError', ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnknownErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnknownError'] = ResolversParentTypes['UnknownError']> = {
  _error_type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hunts?: Resolver<Maybe<Array<ResolversTypes['Hunt']>>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'InvalidInputError' | 'NotFoundError' | 'UnknownError' | 'User', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  AuthorizationError?: AuthorizationErrorResolvers<ContextType>;
  BaseUser?: BaseUserResolvers<ContextType>;
  BaseUserPayload?: BaseUserPayloadResolvers<ContextType>;
  Clue?: ClueResolvers<ContextType>;
  CluePayload?: CluePayloadResolvers<ContextType>;
  CorrectResponse?: CorrectResponseResolvers<ContextType>;
  CorrectResponsePayload?: CorrectResponsePayloadResolvers<ContextType>;
  Delete?: DeleteResolvers<ContextType>;
  DeleteClues?: DeleteCluesResolvers<ContextType>;
  DeleteHunt?: DeleteHuntResolvers<ContextType>;
  DeleteResponses?: DeleteResponsesResolvers<ContextType>;
  DeleteTeam?: DeleteTeamResolvers<ContextType>;
  HintPayload?: HintPayloadResolvers<ContextType>;
  HintSent?: HintSentResolvers<ContextType>;
  Hunt?: HuntResolvers<ContextType>;
  HuntPayload?: HuntPayloadResolvers<ContextType>;
  InvalidInputError?: InvalidInputErrorResolvers<ContextType>;
  Logout?: LogoutResolvers<ContextType>;
  LogoutPayload?: LogoutPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NotFoundError?: NotFoundErrorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponsePayload?: ResponsePayloadResolvers<ContextType>;
  Responses?: ResponsesResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamPayload?: TeamPayloadResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  UnknownError?: UnknownErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
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
  "possibleTypes": {
    "AuthPayload": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "Token",
      "UnknownError"
    ],
    "BaseUserPayload": [
      "AuthorizationError",
      "BaseUser",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "CluePayload": [
      "AuthorizationError",
      "Clue",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "CorrectResponsePayload": [
      "AuthorizationError",
      "CorrectResponse",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "DeleteClues": [
      "AuthorizationError",
      "Delete",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "DeleteHunt": [
      "AuthorizationError",
      "Delete",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "DeleteResponses": [
      "AuthorizationError",
      "Delete",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "DeleteTeam": [
      "AuthorizationError",
      "Delete",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "HintPayload": [
      "AuthorizationError",
      "HintSent",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "HuntPayload": [
      "AuthorizationError",
      "Hunt",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "LogoutPayload": [
      "AuthorizationError",
      "InvalidInputError",
      "Logout",
      "NotFoundError",
      "UnknownError"
    ],
    "ResponsePayload": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "Responses",
      "UnknownError"
    ],
    "TeamPayload": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "Team",
      "UnknownError"
    ],
    "UserPayload": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError",
      "User"
    ]
  }
};
      export default result;
    