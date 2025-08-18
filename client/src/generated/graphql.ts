import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type Analytics = {
  __typename: 'Analytics';
  avg_response_time: Scalars['Int']['output'];
  rejection_ratio: Scalars['Int']['output'];
  total_responses: Scalars['Int']['output'];
};

export type AuthPayload = {
  __typename: 'AuthPayload';
  _id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type CluePayload = {
  __typename: 'CluePayload';
  _id: Scalars['ID']['output'];
  analytics?: Maybe<Analytics>;
  description: Scalars['String']['output'];
  hunt_id: Scalars['ID']['output'];
  order_number: Scalars['Int']['output'];
  responses?: Maybe<Array<Maybe<ResponsePayload>>>;
};

export type CreateCluesInput = {
  cluesList: Array<Scalars['String']['input']>;
  h_id: Scalars['String']['input'];
};

export type CreateHuntInput = {
  end_date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  recall_message?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['String']['input'];
};

export type CreateSubscriptionPayload = {
  __typename: 'CreateSubscriptionPayload';
  clientSecret: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type CreateTeamsInput = {
  hunt_id: Scalars['String']['input'];
  teams: Array<SingleTeam>;
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

export enum FilterSource {
  Clue = 'CLUE',
  Team = 'TEAM'
}

export type Hunt = {
  __typename: 'Hunt';
  _id: Scalars['ID']['output'];
  analytics?: Maybe<Analytics>;
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
  createClues: Array<CluePayload>;
  createHunt: Hunt;
  createSubscription: CreateSubscriptionPayload;
  createTeams: Array<Maybe<Team>>;
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


export type MutationCreateCluesArgs = {
  input: CreateCluesInput;
};


export type MutationCreateHuntArgs = {
  input: CreateHuntInput;
};


export type MutationCreateSubscriptionArgs = {
  payment_method_id: Scalars['String']['input'];
};


export type MutationCreateTeamsArgs = {
  input: CreateTeamsInput;
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
  getResults: Hunt;
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


export type QueryGetResultsArgs = {
  filters?: InputMaybe<Array<ResultsFilters>>;
  hunt_id: Scalars['ID']['input'];
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

export type ResultsFilters = {
  source: FilterSource;
  value: Scalars['String']['input'];
};

export type SendHintInput = {
  hint_body: Scalars['String']['input'];
  response_id: Scalars['ID']['input'];
  team_id: Scalars['ID']['input'];
};

export type SingleTeam = {
  device_number: Scalars['String']['input'];
  members: Scalars['String']['input'];
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
  analytics?: Maybe<Analytics>;
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

export type ClueFragment = { __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string };

export type HuntFragment = { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string };

export type HuntBalanceFragment = { __typename: 'Hunt', _id: string, created_by: string, balance_usd: number };

export type FullHuntFragment = { __typename: 'Hunt', _id: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, created_by: string, twilio_number: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string }> | null };

export type ResponseFragment = { __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string> | null, correct?: boolean | null, hint_sent?: boolean | null };

export type ResultsFragment = { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string }> | null, clues?: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string }> | null, analytics?: { __typename: 'Analytics', total_responses: number, avg_response_time: number, rejection_ratio: number } | null };

export type StripeChargeFragment = { __typename: 'StripeCharge', id: string, date: number, status: string, amount: number, description?: string | null, paymentIntent?: string | null, paymentCard: { __typename: 'PaymentCard', brand?: string | null, last4?: string | null } };

export type PaymentCardFragment = { __typename: 'PaymentCard', brand?: string | null, last4?: string | null };

export type StripeDefaultPaymentFragment = { __typename: 'PaymentMethod', id: string, brand: string, last4: string };

export type SubscriptionProductFragment = { __typename: 'SubscriptionProduct', id: string, description?: string | null, priceId: string, amount: number };

export type CustomerSubscriptionFragment = { __typename: 'CustomerSubscription', id: string, description?: string | null, priceId: string, amount: number, status: string };

export type CreateSubscriptionPayloadFragment = { __typename: 'CreateSubscriptionPayload', id: string, clientSecret: string };

export type TeamFragment = { __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string };

export type TokenFragment = { __typename: 'AuthPayload', _id: string, token: string };

export type UserFragment = { __typename: 'UserPayload', _id: string, email: string, user_name: string, first_name: string, last_name: string, account: string };

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = { cancelled: boolean };

export type CreateSubscriptionMutationVariables = Exact<{
  paymentMethodId: Scalars['String']['input'];
}>;


export type CreateSubscriptionMutation = { result: { __typename: 'CreateSubscriptionPayload', id: string, clientSecret: string } };

export type ResubscribeMutationVariables = Exact<{ [key: string]: never; }>;


export type ResubscribeMutation = { resubscribe: { __typename: 'CustomerSubscription', id: string, description?: string | null, priceId: string, amount: number, status: string } };

export type CreateMultipleCluesMutationVariables = Exact<{
  input: CreateCluesInput;
}>;


export type CreateMultipleCluesMutation = { clues: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string }> };

export type CreateSingleClueMutationVariables = Exact<{
  input: CreateCluesInput;
}>;


export type CreateSingleClueMutation = { clues: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string }> };

export type DeleteAllCluesByHuntIdMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type DeleteAllCluesByHuntIdMutation = { wasDeleted: boolean };

export type DeleteClueByIdMutationVariables = Exact<{
  clue_id: Scalars['ID']['input'];
}>;


export type DeleteClueByIdMutation = { wasDeleted: boolean };

export type UpdateClueDescriptionMutationVariables = Exact<{
  input: UpdateClueDescriptionInput;
}>;


export type UpdateClueDescriptionMutation = { updatedClue: { __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string } };

export type UpdateClueOrderMutationVariables = Exact<{
  input: UpdateClueOrderInput;
}>;


export type UpdateClueOrderMutation = { updateClueOrder: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string } | null> };

export type ActivateHuntMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type ActivateHuntMutation = { activateHunt: boolean };

export type CreateHuntMutationVariables = Exact<{
  name: Scalars['String']['input'];
  start_date: Scalars['String']['input'];
  end_date: Scalars['String']['input'];
  recall_message?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateHuntMutation = { hunt: { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string } };

export type DeleteHuntMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type DeleteHuntMutation = { deleteHuntById: boolean };

export type MarkHuntCompleteMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type MarkHuntCompleteMutation = { markHuntComplete: boolean };

export type UpdateHuntMutationVariables = Exact<{
  input: UpdateHuntInput;
}>;


export type UpdateHuntMutation = { hunt: { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string } };

export type DeleteAllResponsesByHuntMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAllResponsesByHuntMutation = { deleteAllResponsesByHunt: boolean };

export type DeleteAllResponsesByTeamMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAllResponsesByTeamMutation = { deleteAllResponsesByTeam: boolean };

export type MarkResponseCorrectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkResponseCorrectMutation = { markResponseCorrect: boolean };

export type SendHintMutationVariables = Exact<{
  input: SendHintInput;
}>;


export type SendHintMutation = { sendHint: boolean };

export type CreateMultipleTeamsMutationVariables = Exact<{
  input: CreateTeamsInput;
}>;


export type CreateMultipleTeamsMutation = { teams: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string } | null> };

export type CreateSingleTeamMutationVariables = Exact<{
  input: CreateTeamsInput;
}>;


export type CreateSingleTeamMutation = { team: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string } | null> };

export type DeleteAllTeamsByHuntIdMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type DeleteAllTeamsByHuntIdMutation = { wasDeleted: boolean };

export type DeleteTeamByIdMutationVariables = Exact<{
  team_id: Scalars['ID']['input'];
}>;


export type DeleteTeamByIdMutation = { wasDeleted: boolean };

export type UpdateTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;


export type UpdateTeamMutation = { team: { __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string } };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { deleteUser: boolean };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { login: { __typename: 'AuthPayload', _id: string, token: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type RegisterUserMutation = { registerUser: { __typename: 'AuthPayload', _id: string, token: string } };

export type FetchAccountTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAccountTransactionsQuery = { subscription?: { __typename: 'CustomerSubscription', id: string, description?: string | null, priceId: string, amount: number, status: string } | null, charges: Array<{ __typename: 'StripeCharge', id: string, date: number, status: string, amount: number, description?: string | null, paymentIntent?: string | null, paymentCard: { __typename: 'PaymentCard', brand?: string | null, last4?: string | null } } | null> };

export type FetchDefaultPaymentMethodQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchDefaultPaymentMethodQuery = { defaultPaymentMethod?: { __typename: 'PaymentMethod', id: string, brand: string, last4: string } | null };

export type FetchStripeChargesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchStripeChargesQuery = { charges: Array<{ __typename: 'StripeCharge', id: string, date: number, status: string, amount: number, description?: string | null, paymentIntent?: string | null, paymentCard: { __typename: 'PaymentCard', brand?: string | null, last4?: string | null } } | null> };

export type FetchSubscriptionProductQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchSubscriptionProductQuery = { subscription: { __typename: 'SubscriptionProduct', id: string, description?: string | null, priceId: string, amount: number } };

export type EmailExistsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type EmailExistsQuery = { emailExists: boolean };

export type GetHuntQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetHuntQuery = { hunt: { __typename: 'Hunt', _id: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, created_by: string, twilio_number: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string }> | null } };

export type GetHuntBalanceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetHuntBalanceQuery = { hunt: { __typename: 'Hunt', _id: string, created_by: string, balance_usd: number } };

export type GetHuntsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHuntsByUserIdQuery = { hunts: Array<{ __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string } | null> };

export type GetOrderedCluesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOrderedCluesQuery = { clues: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string } | null> };

export type GetResponseCountByHuntIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetResponseCountByHuntIdQuery = { result: { __typename: 'ResponsesByHunt', count: number } };

export type GetResponsesByHuntIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetResponsesByHuntIdQuery = { result: { __typename: 'ResponsesByHunt', responses?: Array<{ __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string> | null, correct?: boolean | null, hint_sent?: boolean | null } | null> | null } };

export type GetAllResponsesByHuntIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAllResponsesByHuntIdQuery = { result: { __typename: 'ResponsesByHunt', count: number, responses?: Array<{ __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string> | null, correct?: boolean | null, hint_sent?: boolean | null } | null> | null } };

export type GetReusltsQueryVariables = Exact<{
  huntId: Scalars['ID']['input'];
  filters?: InputMaybe<Array<ResultsFilters> | ResultsFilters>;
}>;


export type GetReusltsQuery = { results: { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, twilio_number: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string>, device_number: string }> | null, clues?: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string }> | null, analytics?: { __typename: 'Analytics', total_responses: number, avg_response_time: number, rejection_ratio: number } | null } };

export type GetUserFromTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromTokenQuery = { user: { __typename: 'UserPayload', _id: string, email: string, user_name: string, first_name: string, last_name: string, account: string } };

export type UsernameExistsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsernameExistsQuery = { userNameExists: boolean };

export type ResponseReceivedSubscriptionVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type ResponseReceivedSubscription = { responseReceived?: { __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string> | null, correct?: boolean | null, hint_sent?: boolean | null } | null };


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
    
export const HuntBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HuntBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"balance_usd"}}]}}]} as unknown as DocumentNode<HuntBalanceFragment, unknown>;
export const FullHuntFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullHunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]}}]} as unknown as DocumentNode<FullHuntFragment, unknown>;
export const ResponseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<ResponseFragment, unknown>;
export const HuntFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}}]} as unknown as DocumentNode<HuntFragment, unknown>;
export const TeamFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<TeamFragment, unknown>;
export const ClueFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ClueFragment, unknown>;
export const ResultsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Results"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"analytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_responses"}},{"kind":"Field","name":{"kind":"Name","value":"avg_response_time"}},{"kind":"Field","name":{"kind":"Name","value":"rejection_ratio"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ResultsFragment, unknown>;
export const PaymentCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaymentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}}]} as unknown as DocumentNode<PaymentCardFragment, unknown>;
export const StripeChargeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeCharge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCharge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"paymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"paymentCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaymentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}}]} as unknown as DocumentNode<StripeChargeFragment, unknown>;
export const StripeDefaultPaymentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeDefaultPayment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMethod"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}}]} as unknown as DocumentNode<StripeDefaultPaymentFragment, unknown>;
export const SubscriptionProductFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubscriptionProduct"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]} as unknown as DocumentNode<SubscriptionProductFragment, unknown>;
export const CustomerSubscriptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerSubscription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<CustomerSubscriptionFragment, unknown>;
export const CreateSubscriptionPayloadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CreateSubscriptionPayload"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]} as unknown as DocumentNode<CreateSubscriptionPayloadFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"account"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const CancelSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cancelled"},"name":{"kind":"Name","value":"cancelSubscription"}}]}}]} as unknown as DocumentNode<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const CreateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethodId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"createSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payment_method_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethodId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CreateSubscriptionPayload"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CreateSubscriptionPayload"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]} as unknown as DocumentNode<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const ResubscribeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Resubscribe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resubscribe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerSubscription"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerSubscription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ResubscribeMutation, ResubscribeMutationVariables>;
export const CreateMultipleCluesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleClues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCluesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"createClues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateMultipleCluesMutation, CreateMultipleCluesMutationVariables>;
export const CreateSingleClueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSingleClue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCluesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"createClues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateSingleClueMutation, CreateSingleClueMutationVariables>;
export const DeleteAllCluesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllCluesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteAllCluesByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllCluesByHuntIdMutation, DeleteAllCluesByHuntIdMutationVariables>;
export const DeleteClueByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClueById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clue_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteClueById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clue_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clue_id"}}}]}]}}]} as unknown as DocumentNode<DeleteClueByIdMutation, DeleteClueByIdMutationVariables>;
export const UpdateClueDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClueDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClueDescriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updatedClue"},"name":{"kind":"Name","value":"updateClueDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateClueDescriptionMutation, UpdateClueDescriptionMutationVariables>;
export const UpdateClueOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClueOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClueOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClueOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateClueOrderMutation, UpdateClueOrderMutationVariables>;
export const ActivateHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<ActivateHuntMutation, ActivateHuntMutationVariables>;
export const CreateHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recall_message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"createHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start_date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"end_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end_date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"recall_message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recall_message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}}]} as unknown as DocumentNode<CreateHuntMutation, CreateHuntMutationVariables>;
export const DeleteHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHuntById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<DeleteHuntMutation, DeleteHuntMutationVariables>;
export const MarkHuntCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkHuntComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markHuntComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<MarkHuntCompleteMutation, MarkHuntCompleteMutationVariables>;
export const UpdateHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHuntInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"updateHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}}]} as unknown as DocumentNode<UpdateHuntMutation, UpdateHuntMutationVariables>;
export const DeleteAllResponsesByHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllResponsesByHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAllResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllResponsesByHuntMutation, DeleteAllResponsesByHuntMutationVariables>;
export const DeleteAllResponsesByTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllResponsesByTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAllResponsesByTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllResponsesByTeamMutation, DeleteAllResponsesByTeamMutationVariables>;
export const MarkResponseCorrectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkResponseCorrect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markResponseCorrect"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<MarkResponseCorrectMutation, MarkResponseCorrectMutationVariables>;
export const SendHintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendHint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendHintInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendHint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SendHintMutation, SendHintMutationVariables>;
export const CreateMultipleTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleTeams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"teams"},"name":{"kind":"Name","value":"createTeams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<CreateMultipleTeamsMutation, CreateMultipleTeamsMutationVariables>;
export const CreateSingleTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSingleTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"team"},"name":{"kind":"Name","value":"createTeams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<CreateSingleTeamMutation, CreateSingleTeamMutationVariables>;
export const DeleteAllTeamsByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllTeamsByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteAllTeamsByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllTeamsByHuntIdMutation, DeleteAllTeamsByHuntIdMutationVariables>;
export const DeleteTeamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"team_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}}}]}]}}]} as unknown as DocumentNode<DeleteTeamByIdMutation, DeleteTeamByIdMutationVariables>;
export const UpdateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"team"},"name":{"kind":"Name","value":"updateTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const FetchAccountTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchAccountTransactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"subscription"},"name":{"kind":"Name","value":"fetchCustomerSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerSubscription"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"charges"},"name":{"kind":"Name","value":"fetchStripeCharges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeCharge"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaymentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerSubscription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeCharge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCharge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"paymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"paymentCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentCard"}}]}}]}}]} as unknown as DocumentNode<FetchAccountTransactionsQuery, FetchAccountTransactionsQueryVariables>;
export const FetchDefaultPaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchDefaultPaymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"defaultPaymentMethod"},"name":{"kind":"Name","value":"fetchStripePaymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeDefaultPayment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeDefaultPayment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMethod"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}}]} as unknown as DocumentNode<FetchDefaultPaymentMethodQuery, FetchDefaultPaymentMethodQueryVariables>;
export const FetchStripeChargesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchStripeCharges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"charges"},"name":{"kind":"Name","value":"fetchStripeCharges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeCharge"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaymentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeCharge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeCharge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"paymentIntent"}},{"kind":"Field","name":{"kind":"Name","value":"paymentCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentCard"}}]}}]}}]} as unknown as DocumentNode<FetchStripeChargesQuery, FetchStripeChargesQueryVariables>;
export const FetchSubscriptionProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSubscriptionProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"subscription"},"name":{"kind":"Name","value":"fetchSubscriptionProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubscriptionProduct"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubscriptionProduct"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]} as unknown as DocumentNode<FetchSubscriptionProductQuery, FetchSubscriptionProductQueryVariables>;
export const EmailExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<EmailExistsQuery, EmailExistsQueryVariables>;
export const GetHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"getHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullHunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullHunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]}}]} as unknown as DocumentNode<GetHuntQuery, GetHuntQueryVariables>;
export const GetHuntBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHuntBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"getHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HuntBalance"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HuntBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"balance_usd"}}]}}]} as unknown as DocumentNode<GetHuntBalanceQuery, GetHuntBalanceQueryVariables>;
export const GetHuntsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHuntsByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunts"},"name":{"kind":"Name","value":"getHuntsByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}}]} as unknown as DocumentNode<GetHuntsByUserIdQuery, GetHuntsByUserIdQueryVariables>;
export const GetOrderedCluesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderedClues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"getCluesByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetOrderedCluesQuery, GetOrderedCluesQueryVariables>;
export const GetResponseCountByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResponseCountByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetResponseCountByHuntIdQuery, GetResponseCountByHuntIdQueryVariables>;
export const GetResponsesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResponsesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<GetResponsesByHuntIdQuery, GetResponsesByHuntIdQueryVariables>;
export const GetAllResponsesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetALLResponsesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<GetAllResponsesByHuntIdQuery, GetAllResponsesByHuntIdQueryVariables>;
export const GetReusltsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReuslts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"huntId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResultsFilters"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"results"},"name":{"kind":"Name","value":"getResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"huntId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Results"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"twilio_number"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Results"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"analytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_responses"}},{"kind":"Field","name":{"kind":"Name","value":"avg_response_time"}},{"kind":"Field","name":{"kind":"Name","value":"rejection_ratio"}}]}}]}}]} as unknown as DocumentNode<GetReusltsQuery, GetReusltsQueryVariables>;
export const GetUserFromTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUserFromToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"account"}}]}}]} as unknown as DocumentNode<GetUserFromTokenQuery, GetUserFromTokenQueryVariables>;
export const UsernameExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsernameExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userNameExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UsernameExistsQuery, UsernameExistsQueryVariables>;
export const ResponseReceivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ResponseReceived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"responseReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<ResponseReceivedSubscription, ResponseReceivedSubscriptionVariables>;