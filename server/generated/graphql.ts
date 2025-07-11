import { GraphQLResolveInfo } from 'graphql';
import { ApolloServerContext } from '../types/ApolloServerContextType';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename: 'AuthPayload';
  _id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type CluePayload = {
  __typename: 'CluePayload';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  hunt_id: Scalars['ID']['output'];
  order_number: Scalars['Int']['output'];
  responses?: Maybe<Array<Maybe<ResponsePayload>>>;
};

export type CreateHuntInput = {
  end_date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  recall_message?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['String']['input'];
};

export type CreateMultipleCluesInput = {
  cluesList: Array<Scalars['String']['input']>;
  h_id: Scalars['String']['input'];
};

export type CreateMultipleTeamsInput = {
  hunt_id: Scalars['String']['input'];
  teams: Array<InputMaybe<SingleTeam>>;
};

export type CreateSingleClueInput = {
  description: Scalars['String']['input'];
  h_id: Scalars['String']['input'];
};

export type CreateSingleTeamInput = {
  device_number: Scalars['String']['input'];
  hunt_id: Scalars['String']['input'];
  members: Array<InputMaybe<Scalars['String']['input']>>;
};

export type CreateSubscriptionPayload = {
  __typename: 'CreateSubscriptionPayload';
  clientSecret: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type CustomerSubscription = StripeSubscription & {
  __typename: 'CustomerSubscription';
  amount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  priceId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type DeleteTeamInput = {
  team_id: Scalars['ID']['input'];
};

export type Hunt = {
  __typename: 'Hunt';
  _id: Scalars['ID']['output'];
  balance_usd: Scalars['Float']['output'];
  clues?: Maybe<Array<CluePayload>>;
  created_by: Scalars['ID']['output'];
  created_date: Scalars['String']['output'];
  end_date: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
  marked_complete: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  recall_message: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  teams?: Maybe<Array<Team>>;
  twilio_number: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  activateHunt: Scalars['Boolean']['output'];
  cancelSubscription: Scalars['Boolean']['output'];
  createHunt: Hunt;
  createMultipleClues: Array<CluePayload>;
  createMultipleTeams: Array<Maybe<Team>>;
  createSingleClue: Array<CluePayload>;
  createSingleTeam: Team;
  createSubscription: CreateSubscriptionPayload;
  deleteAllCluesByHuntId: Scalars['Boolean']['output'];
  deleteAllResponsesByHunt: Scalars['Boolean']['output'];
  deleteAllResponsesByTeam: Scalars['Boolean']['output'];
  deleteAllTeamsByHuntId: Scalars['Boolean']['output'];
  deleteClueById: Scalars['Boolean']['output'];
  deleteHuntById: Scalars['Boolean']['output'];
  deleteTeam: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  markHuntComplete: Scalars['Boolean']['output'];
  markResponseCorrect: Scalars['Boolean']['output'];
  registerUser: AuthPayload;
  resubscribe: CustomerSubscription;
  sendHint: Scalars['Boolean']['output'];
  updateClueDescription: CluePayload;
  updateClueOrder: Array<Maybe<CluePayload>>;
  updateHunt: Hunt;
  updateTeam: Team;
};


export type MutationActivateHuntArgs = {
  id: Scalars['ID']['input'];
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


export type MutationCreateSubscriptionArgs = {
  payment_method_id: Scalars['String']['input'];
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


export type MutationDeleteAllTeamsByHuntIdArgs = {
  hunt_id: Scalars['ID']['input'];
};


export type MutationDeleteClueByIdArgs = {
  clue_id: Scalars['ID']['input'];
};


export type MutationDeleteHuntByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  team_id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  user_id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkHuntCompleteArgs = {
  id: Scalars['ID']['input'];
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

export type PaymentCard = {
  __typename: 'PaymentCard';
  brand?: Maybe<Scalars['String']['output']>;
  last4?: Maybe<Scalars['String']['output']>;
};

export type PaymentMethod = {
  __typename: 'PaymentMethod';
  brand: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last4: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
  deleteAllHuntsByUser: Scalars['Boolean']['output'];
  emailExists: Scalars['Boolean']['output'];
  fetchCustomerSubscription?: Maybe<CustomerSubscription>;
  fetchStripeCharges: Array<Maybe<StripeCharge>>;
  fetchStripePaymentMethod?: Maybe<PaymentMethod>;
  fetchSubscriptionProduct: SubscriptionProduct;
  getCluesByHuntId: Array<Maybe<CluePayload>>;
  getHunt: Hunt;
  getHuntsByUserId: Array<Maybe<Hunt>>;
  getResponsesByClue: Array<Maybe<ResponsePayload>>;
  getResponsesByHunt: ResponsesByHunt;
  getResponsesByTeam: Array<Maybe<ResponsePayload>>;
  getTeam: Team;
  getTeamsByHuntId: Array<Maybe<Team>>;
  getUserFromToken: UserPayload;
  userNameExists: Scalars['Boolean']['output'];
};


export type QueryEmailExistsArgs = {
  email: Scalars['String']['input'];
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


export type QueryGetResponsesByHuntArgs = {
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


export type QueryUserNameExistsArgs = {
  user_name: Scalars['String']['input'];
};

export type ResponsePayload = {
  __typename: 'ResponsePayload';
  _id: Scalars['ID']['output'];
  clue_id: Scalars['String']['output'];
  correct?: Maybe<Scalars['Boolean']['output']>;
  hint_sent?: Maybe<Scalars['Boolean']['output']>;
  response_img?: Maybe<Array<Scalars['String']['output']>>;
  response_txt?: Maybe<Scalars['String']['output']>;
  team_id: Scalars['String']['output'];
  time_received: Scalars['String']['output'];
};

export type ResponsesByHunt = {
  __typename: 'ResponsesByHunt';
  count: Scalars['Int']['output'];
  responses?: Maybe<Array<Maybe<ResponsePayload>>>;
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

export type StripeCharge = {
  __typename: 'StripeCharge';
  amount: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  paymentCard: PaymentCard;
  paymentIntent?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type StripePaymentIntent = {
  __typename: 'StripePaymentIntent';
  id: Scalars['String']['output'];
};

export type StripeSubscription = {
  amount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  priceId: Scalars['String']['output'];
};

export type Subscription = {
  __typename: 'Subscription';
  responseReceived?: Maybe<ResponsePayload>;
};


export type SubscriptionResponseReceivedArgs = {
  hunt_id: Scalars['ID']['input'];
};

export type SubscriptionProduct = StripeSubscription & {
  __typename: 'SubscriptionProduct';
  amount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  priceId: Scalars['String']['output'];
};

export type Team = {
  __typename: 'Team';
  _id: Scalars['ID']['output'];
  device_number: Scalars['String']['output'];
  hunt_id: Scalars['ID']['output'];
  last_clue_sent: Scalars['Int']['output'];
  members: Array<Scalars['String']['output']>;
  recall_sent: Scalars['Boolean']['output'];
  responses?: Maybe<Array<ResponsePayload>>;
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
  name?: InputMaybe<Scalars['String']['input']>;
  recall_message?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeamInput = {
  device_number?: InputMaybe<Scalars['String']['input']>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  team_id: Scalars['ID']['input'];
};

export type UserPayload = {
  __typename: 'UserPayload';
  _id: Scalars['ID']['output'];
  account: Scalars['String']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  StripeSubscription: ( CustomerSubscription ) | ( SubscriptionProduct );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddUserInput: AddUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  CluePayload: ResolverTypeWrapper<CluePayload>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateHuntInput: CreateHuntInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateMultipleTeamsInput: CreateMultipleTeamsInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  CreateSubscriptionPayload: ResolverTypeWrapper<CreateSubscriptionPayload>;
  CustomerSubscription: ResolverTypeWrapper<CustomerSubscription>;
  DeleteTeamInput: DeleteTeamInput;
  Hunt: ResolverTypeWrapper<Hunt>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaymentCard: ResolverTypeWrapper<PaymentCard>;
  PaymentMethod: ResolverTypeWrapper<PaymentMethod>;
  Query: ResolverTypeWrapper<{}>;
  ResponsePayload: ResolverTypeWrapper<ResponsePayload>;
  ResponsesByHunt: ResolverTypeWrapper<ResponsesByHunt>;
  SendHintInput: SendHintInput;
  SingleTeam: SingleTeam;
  StripeCharge: ResolverTypeWrapper<StripeCharge>;
  StripePaymentIntent: ResolverTypeWrapper<StripePaymentIntent>;
  StripeSubscription: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['StripeSubscription']>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionProduct: ResolverTypeWrapper<SubscriptionProduct>;
  Team: ResolverTypeWrapper<Team>;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateHuntInput: UpdateHuntInput;
  UpdateTeamInput: UpdateTeamInput;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddUserInput: AddUserInput;
  String: Scalars['String']['output'];
  AuthPayload: AuthPayload;
  ID: Scalars['ID']['output'];
  CluePayload: CluePayload;
  Int: Scalars['Int']['output'];
  CreateHuntInput: CreateHuntInput;
  CreateMultipleCluesInput: CreateMultipleCluesInput;
  CreateMultipleTeamsInput: CreateMultipleTeamsInput;
  CreateSingleClueInput: CreateSingleClueInput;
  CreateSingleTeamInput: CreateSingleTeamInput;
  CreateSubscriptionPayload: CreateSubscriptionPayload;
  CustomerSubscription: CustomerSubscription;
  DeleteTeamInput: DeleteTeamInput;
  Hunt: Hunt;
  Float: Scalars['Float']['output'];
  Boolean: Scalars['Boolean']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  PaymentCard: PaymentCard;
  PaymentMethod: PaymentMethod;
  Query: {};
  ResponsePayload: ResponsePayload;
  ResponsesByHunt: ResponsesByHunt;
  SendHintInput: SendHintInput;
  SingleTeam: SingleTeam;
  StripeCharge: StripeCharge;
  StripePaymentIntent: StripePaymentIntent;
  StripeSubscription: ResolversInterfaceTypes<ResolversParentTypes>['StripeSubscription'];
  Subscription: {};
  SubscriptionProduct: SubscriptionProduct;
  Team: Team;
  UpdateClueDescriptionInput: UpdateClueDescriptionInput;
  UpdateClueOrderInput: UpdateClueOrderInput;
  UpdateHuntInput: UpdateHuntInput;
  UpdateTeamInput: UpdateTeamInput;
  UserPayload: UserPayload;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = ApolloServerContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CluePayloadResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CluePayload'] = ResolversParentTypes['CluePayload']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateSubscriptionPayloadResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CreateSubscriptionPayload'] = ResolversParentTypes['CreateSubscriptionPayload']> = ResolversObject<{
  clientSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerSubscriptionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CustomerSubscription'] = ResolversParentTypes['CustomerSubscription']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HuntResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Hunt'] = ResolversParentTypes['Hunt']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  balance_usd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  clues?: Resolver<Maybe<Array<ResolversTypes['CluePayload']>>, ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  marked_complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recall_message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  twilio_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  activateHunt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationActivateHuntArgs, 'id'>>;
  cancelSubscription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createHunt?: Resolver<ResolversTypes['Hunt'], ParentType, ContextType, RequireFields<MutationCreateHuntArgs, 'input'>>;
  createMultipleClues?: Resolver<Array<ResolversTypes['CluePayload']>, ParentType, ContextType, RequireFields<MutationCreateMultipleCluesArgs, 'input'>>;
  createMultipleTeams?: Resolver<Array<Maybe<ResolversTypes['Team']>>, ParentType, ContextType, RequireFields<MutationCreateMultipleTeamsArgs, 'input'>>;
  createSingleClue?: Resolver<Array<ResolversTypes['CluePayload']>, ParentType, ContextType, RequireFields<MutationCreateSingleClueArgs, 'input'>>;
  createSingleTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateSingleTeamArgs, 'input'>>;
  createSubscription?: Resolver<ResolversTypes['CreateSubscriptionPayload'], ParentType, ContextType, RequireFields<MutationCreateSubscriptionArgs, 'payment_method_id'>>;
  deleteAllCluesByHuntId?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAllCluesByHuntIdArgs, 'hunt_id'>>;
  deleteAllResponsesByHunt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByHuntArgs, 'id'>>;
  deleteAllResponsesByTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAllResponsesByTeamArgs, 'id'>>;
  deleteAllTeamsByHuntId?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAllTeamsByHuntIdArgs, 'hunt_id'>>;
  deleteClueById?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClueByIdArgs, 'clue_id'>>;
  deleteHuntById?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteHuntByIdArgs, 'id'>>;
  deleteTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'team_id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'user_id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  markHuntComplete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMarkHuntCompleteArgs, 'id'>>;
  markResponseCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMarkResponseCorrectArgs, 'id'>>;
  registerUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  resubscribe?: Resolver<ResolversTypes['CustomerSubscription'], ParentType, ContextType>;
  sendHint?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendHintArgs, 'input'>>;
  updateClueDescription?: Resolver<ResolversTypes['CluePayload'], ParentType, ContextType, RequireFields<MutationUpdateClueDescriptionArgs, 'input'>>;
  updateClueOrder?: Resolver<Array<Maybe<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<MutationUpdateClueOrderArgs, 'input'>>;
  updateHunt?: Resolver<ResolversTypes['Hunt'], ParentType, ContextType, RequireFields<MutationUpdateHuntArgs, 'input'>>;
  updateTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'input'>>;
}>;

export type PaymentCardResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PaymentCard'] = ResolversParentTypes['PaymentCard']> = ResolversObject<{
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last4?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentMethodResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = ResolversObject<{
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last4?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  deleteAllHuntsByUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  emailExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryEmailExistsArgs, 'email'>>;
  fetchCustomerSubscription?: Resolver<Maybe<ResolversTypes['CustomerSubscription']>, ParentType, ContextType>;
  fetchStripeCharges?: Resolver<Array<Maybe<ResolversTypes['StripeCharge']>>, ParentType, ContextType>;
  fetchStripePaymentMethod?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  fetchSubscriptionProduct?: Resolver<ResolversTypes['SubscriptionProduct'], ParentType, ContextType>;
  getCluesByHuntId?: Resolver<Array<Maybe<ResolversTypes['CluePayload']>>, ParentType, ContextType, RequireFields<QueryGetCluesByHuntIdArgs, 'id'>>;
  getHunt?: Resolver<ResolversTypes['Hunt'], ParentType, ContextType, RequireFields<QueryGetHuntArgs, 'id'>>;
  getHuntsByUserId?: Resolver<Array<Maybe<ResolversTypes['Hunt']>>, ParentType, ContextType>;
  getResponsesByClue?: Resolver<Array<Maybe<ResolversTypes['ResponsePayload']>>, ParentType, ContextType, RequireFields<QueryGetResponsesByClueArgs, 'id'>>;
  getResponsesByHunt?: Resolver<ResolversTypes['ResponsesByHunt'], ParentType, ContextType, RequireFields<QueryGetResponsesByHuntArgs, 'id'>>;
  getResponsesByTeam?: Resolver<Array<Maybe<ResolversTypes['ResponsePayload']>>, ParentType, ContextType, RequireFields<QueryGetResponsesByTeamArgs, 'id'>>;
  getTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamArgs, 'id'>>;
  getTeamsByHuntId?: Resolver<Array<Maybe<ResolversTypes['Team']>>, ParentType, ContextType, RequireFields<QueryGetTeamsByHuntIdArgs, 'h_id'>>;
  getUserFromToken?: Resolver<ResolversTypes['UserPayload'], ParentType, ContextType>;
  userNameExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryUserNameExistsArgs, 'user_name'>>;
}>;

export type ResponsePayloadResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ResponsePayload'] = ResolversParentTypes['ResponsePayload']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clue_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hint_sent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  response_img?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  response_txt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  team_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time_received?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponsesByHuntResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ResponsesByHunt'] = ResolversParentTypes['ResponsesByHunt']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResponsePayload']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StripeChargeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['StripeCharge'] = ResolversParentTypes['StripeCharge']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentCard?: Resolver<ResolversTypes['PaymentCard'], ParentType, ContextType>;
  paymentIntent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StripePaymentIntentResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['StripePaymentIntent'] = ResolversParentTypes['StripePaymentIntent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StripeSubscriptionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['StripeSubscription'] = ResolversParentTypes['StripeSubscription']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CustomerSubscription' | 'SubscriptionProduct', ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  responseReceived?: SubscriptionResolver<Maybe<ResolversTypes['ResponsePayload']>, "responseReceived", ParentType, ContextType, RequireFields<SubscriptionResponseReceivedArgs, 'hunt_id'>>;
}>;

export type SubscriptionProductResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['SubscriptionProduct'] = ResolversParentTypes['SubscriptionProduct']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeamResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  device_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hunt_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_clue_sent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  recall_sent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<ResolversTypes['ResponsePayload']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPayloadResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CluePayload?: CluePayloadResolvers<ContextType>;
  CreateSubscriptionPayload?: CreateSubscriptionPayloadResolvers<ContextType>;
  CustomerSubscription?: CustomerSubscriptionResolvers<ContextType>;
  Hunt?: HuntResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaymentCard?: PaymentCardResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponsePayload?: ResponsePayloadResolvers<ContextType>;
  ResponsesByHunt?: ResponsesByHuntResolvers<ContextType>;
  StripeCharge?: StripeChargeResolvers<ContextType>;
  StripePaymentIntent?: StripePaymentIntentResolvers<ContextType>;
  StripeSubscription?: StripeSubscriptionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubscriptionProduct?: SubscriptionProductResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ApolloServerContext> = ResolversObject<{
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
}>;

import { ObjectId } from 'mongodb';

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "StripeSubscription": [
      "CustomerSubscription",
      "SubscriptionProduct"
    ]
  }
};
      export default result;
    