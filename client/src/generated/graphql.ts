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
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type AllUsersPayload = {
  __typename: 'AllUsersPayload';
  _id: Scalars['ID']['output'];
  first_name: Scalars['String']['output'];
  hunts?: Maybe<Array<Hunt>>;
  last_name: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
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

export type CluesListItem = {
  description: Scalars['String']['input'];
  orderNumber: Scalars['Int']['input'];
};

export type CreateHuntInput = {
  end_date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  recall_message?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['String']['input'];
};

export type CreateMultipleCluesInput = {
  cluesList: Array<InputMaybe<CluesListItem>>;
  h_id: Scalars['String']['input'];
};

export type CreateMultipleTeamsInput = {
  hunt_id: Scalars['String']['input'];
  teams: Array<InputMaybe<SingleTeam>>;
};

export type CreateSingleClueInput = {
  clueItem: CluesListItem;
  h_id: Scalars['String']['input'];
};

export type CreateSingleTeamInput = {
  device_number: Scalars['String']['input'];
  hunt_id: Scalars['String']['input'];
  members: Array<InputMaybe<Scalars['String']['input']>>;
};

export type DeleteTeamInput = {
  team_id: Scalars['ID']['input'];
};

export type Hunt = {
  __typename: 'Hunt';
  _id: Scalars['ID']['output'];
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
};

export type LoginInput = {
  password: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  activateHunt: Scalars['Boolean']['output'];
  createHunt: Hunt;
  createMultipleClues: Array<Maybe<CluePayload>>;
  createMultipleTeams: Array<Maybe<Team>>;
  createSingleClue: Array<Maybe<CluePayload>>;
  createSingleTeam: Team;
  deleteAllCluesByHuntId: Scalars['Boolean']['output'];
  deleteAllResponsesByHunt: Scalars['Boolean']['output'];
  deleteAllResponsesByTeam: Scalars['Boolean']['output'];
  deleteAllTeamsByHuntId: Scalars['Boolean']['output'];
  deleteClueById: Scalars['Boolean']['output'];
  deleteHuntById: Scalars['Boolean']['output'];
  deleteTeam: Scalars['Boolean']['output'];
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  markHuntComplete: Scalars['Boolean']['output'];
  markResponseCorrect: Scalars['Boolean']['output'];
  registerUser: AuthPayload;
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
  h_id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  team_id: Scalars['ID']['input'];
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

export type Query = {
  __typename: 'Query';
  deleteAllHuntsByUser: Scalars['Boolean']['output'];
  getAllUsers?: Maybe<Array<Maybe<AllUsersPayload>>>;
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


export type QueryGetUserFromTokenArgs = {
  tkn: Scalars['String']['input'];
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
  response_img?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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

export type Subscription = {
  __typename: 'Subscription';
  responseReceived?: Maybe<ResponsePayload>;
};


export type SubscriptionResponseReceivedArgs = {
  hunt_id: Scalars['ID']['input'];
};

export type Team = {
  __typename: 'Team';
  _id: Scalars['ID']['output'];
  device_number: Scalars['String']['output'];
  hunt_id: Scalars['ID']['output'];
  last_clue_sent: Scalars['Int']['output'];
  members: Array<Maybe<Scalars['String']['output']>>;
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
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};

export type ClueFragment = { __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string };

export type HuntFragment = { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string };

export type FullHuntFragment = { __typename: 'Hunt', _id: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, created_by: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string | null>, device_number: string }> | null };

export type ResponseFragment = { __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string | null> | null, correct?: boolean | null, hint_sent?: boolean | null };

export type TeamFragment = { __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string | null>, device_number: string };

export type TokenFragment = { __typename: 'AuthPayload', _id: string, token: string };

export type UserFragment = { __typename: 'UserPayload', _id: string, user_name: string, first_name: string, last_name: string };

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


export type CreateHuntMutation = { hunt: { __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string } };

export type CreateMultipleCluesMutationVariables = Exact<{
  input: CreateMultipleCluesInput;
}>;


export type CreateMultipleCluesMutation = { clues: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string } | null> };

export type CreateMultipleTeamsMutationVariables = Exact<{
  input: CreateMultipleTeamsInput;
}>;


export type CreateMultipleTeamsMutation = { teams: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string | null>, device_number: string } | null> };

export type CreateSingleClueMutationVariables = Exact<{
  input: CreateSingleClueInput;
}>;


export type CreateSingleClueMutation = { clues: Array<{ __typename: 'CluePayload', _id: string, hunt_id: string, order_number: number, description: string } | null> };

export type CreateSingleTeamMutationVariables = Exact<{
  input: CreateSingleTeamInput;
}>;


export type CreateSingleTeamMutation = { team: { __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string | null>, device_number: string } };

export type DeleteAllCluesByHuntIdMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type DeleteAllCluesByHuntIdMutation = { wasDeleted: boolean };

export type DeleteAllTeamsByHuntIdMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type DeleteAllTeamsByHuntIdMutation = { wasDeleted: boolean };

export type DeleteClueByIdMutationVariables = Exact<{
  clue_id: Scalars['ID']['input'];
}>;


export type DeleteClueByIdMutation = { wasDeleted: boolean };

export type DeleteTeamByIdMutationVariables = Exact<{
  team_id: Scalars['ID']['input'];
}>;


export type DeleteTeamByIdMutation = { wasDeleted: boolean };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { login: { __typename: 'AuthPayload', _id: string, token: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { logout: boolean };

export type MarkHuntCompleteMutationVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type MarkHuntCompleteMutation = { markHuntComplete: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type RegisterUserMutation = { registerUser: { __typename: 'AuthPayload', _id: string, token: string } };

export type GetHuntQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetHuntQuery = { hunt: { __typename: 'Hunt', _id: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string, created_by: string, teams?: Array<{ __typename: 'Team', _id: string, hunt_id: string, recall_sent: boolean, last_clue_sent: number, members: Array<string | null>, device_number: string }> | null } };

export type GetHuntsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHuntsByUserIdQuery = { hunts: Array<{ __typename: 'Hunt', _id: string, created_by: string, name: string, created_date: string, start_date: string, end_date: string, is_active: boolean, marked_complete: boolean, recall_message: string } | null> };

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


export type GetResponsesByHuntIdQuery = { result: { __typename: 'ResponsesByHunt', responses?: Array<{ __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string | null> | null, correct?: boolean | null, hint_sent?: boolean | null } | null> | null } };

export type GetAllResponsesByHuntIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAllResponsesByHuntIdQuery = { result: { __typename: 'ResponsesByHunt', count: number, responses?: Array<{ __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string | null> | null, correct?: boolean | null, hint_sent?: boolean | null } | null> | null } };

export type GetUserFromTokenQueryVariables = Exact<{
  tkn: Scalars['String']['input'];
}>;


export type GetUserFromTokenQuery = { user: { __typename: 'UserPayload', _id: string, user_name: string, first_name: string, last_name: string } };

export type UsernameExistsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsernameExistsQuery = { userNameExists: boolean };

export type ResponseReceivedSubscriptionVariables = Exact<{
  hunt_id: Scalars['ID']['input'];
}>;


export type ResponseReceivedSubscription = { responseReceived?: { __typename: 'ResponsePayload', _id: string, clue_id: string, team_id: string, time_received: string, response_txt?: string | null, response_img?: Array<string | null> | null, correct?: boolean | null, hint_sent?: boolean | null } | null };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
export const ClueFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ClueFragment, unknown>;
export const HuntFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}}]}}]} as unknown as DocumentNode<HuntFragment, unknown>;
export const FullHuntFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullHunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]}}]} as unknown as DocumentNode<FullHuntFragment, unknown>;
export const ResponseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<ResponseFragment, unknown>;
export const TeamFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<TeamFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const ActivateHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<ActivateHuntMutation, ActivateHuntMutationVariables>;
export const CreateHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recall_message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"createHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start_date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"end_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end_date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"recall_message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recall_message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}}]}}]} as unknown as DocumentNode<CreateHuntMutation, CreateHuntMutationVariables>;
export const CreateMultipleCluesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleClues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMultipleCluesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"createMultipleClues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateMultipleCluesMutation, CreateMultipleCluesMutationVariables>;
export const CreateMultipleTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleTeams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMultipleTeamsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"teams"},"name":{"kind":"Name","value":"createMultipleTeams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<CreateMultipleTeamsMutation, CreateMultipleTeamsMutationVariables>;
export const CreateSingleClueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSingleClue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSingleClueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"createSingleClue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateSingleClueMutation, CreateSingleClueMutationVariables>;
export const CreateSingleTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSingleTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSingleTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"team"},"name":{"kind":"Name","value":"createSingleTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Team"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]} as unknown as DocumentNode<CreateSingleTeamMutation, CreateSingleTeamMutationVariables>;
export const DeleteAllCluesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllCluesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteAllCluesByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllCluesByHuntIdMutation, DeleteAllCluesByHuntIdMutationVariables>;
export const DeleteAllTeamsByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllTeamsByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteAllTeamsByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<DeleteAllTeamsByHuntIdMutation, DeleteAllTeamsByHuntIdMutationVariables>;
export const DeleteClueByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClueById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clue_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteClueById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clue_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clue_id"}}}]}]}}]} as unknown as DocumentNode<DeleteClueByIdMutation, DeleteClueByIdMutationVariables>;
export const DeleteTeamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wasDeleted"},"name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"team_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}}}]}]}}]} as unknown as DocumentNode<DeleteTeamByIdMutation, DeleteTeamByIdMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const MarkHuntCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkHuntComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markHuntComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}]}]}}]} as unknown as DocumentNode<MarkHuntCompleteMutation, MarkHuntCompleteMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetHuntDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHunt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunt"},"name":{"kind":"Name","value":"getHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullHunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullHunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"recall_sent"}},{"kind":"Field","name":{"kind":"Name","value":"last_clue_sent"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"device_number"}}]}}]}}]} as unknown as DocumentNode<GetHuntQuery, GetHuntQueryVariables>;
export const GetHuntsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHuntsByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hunts"},"name":{"kind":"Name","value":"getHuntsByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hunt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"marked_complete"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}}]}}]} as unknown as DocumentNode<GetHuntsByUserIdQuery, GetHuntsByUserIdQueryVariables>;
export const GetOrderedCluesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderedClues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"clues"},"name":{"kind":"Name","value":"getCluesByHuntId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Clue"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Clue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CluePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hunt_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetOrderedCluesQuery, GetOrderedCluesQueryVariables>;
export const GetResponseCountByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResponseCountByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetResponseCountByHuntIdQuery, GetResponseCountByHuntIdQueryVariables>;
export const GetResponsesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResponsesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<GetResponsesByHuntIdQuery, GetResponsesByHuntIdQueryVariables>;
export const GetAllResponsesByHuntIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetALLResponsesByHuntId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"getResponsesByHunt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<GetAllResponsesByHuntIdQuery, GetAllResponsesByHuntIdQueryVariables>;
export const GetUserFromTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tkn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUserFromToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tkn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tkn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]} as unknown as DocumentNode<GetUserFromTokenQuery, GetUserFromTokenQueryVariables>;
export const UsernameExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsernameExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userNameExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UsernameExistsQuery, UsernameExistsQueryVariables>;
export const ResponseReceivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ResponseReceived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"responseReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hunt_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hunt_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Response"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Response"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clue_id"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}},{"kind":"Field","name":{"kind":"Name","value":"time_received"}},{"kind":"Field","name":{"kind":"Name","value":"response_txt"}},{"kind":"Field","name":{"kind":"Name","value":"response_img"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"hint_sent"}}]}}]} as unknown as DocumentNode<ResponseReceivedSubscription, ResponseReceivedSubscriptionVariables>;