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
  ID: { input: string | number; output: string; }
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

export type AnyError = AuthorizationError | InvalidInputError | NotFoundError | UnknownError;

export type AuthPayload = AuthorizationError | InvalidInputError | NotFoundError | Token | UnknownError;

export type AuthorizationError = BaseError & {
  __typename: 'AuthorizationError';
  message: Scalars['String']['output'];
};

export type BaseError = {
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

export type InvalidInputError = BaseError & {
  __typename: 'InvalidInputError';
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

export type NotFoundError = BaseError & {
  __typename: 'NotFoundError';
  message: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
  activateHunt: HuntPayload;
  deactivateHunt: HuntPayload;
  deleteAllHuntsByUser: DeleteHunt;
  getAllUsers?: Maybe<Array<Maybe<UserPayload>>>;
  getCluesByHuntId?: Maybe<Array<CluePayload>>;
  getHunt: HuntPayload;
  getHuntsByUserId?: Maybe<Array<HuntPayload>>;
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

export type UnknownError = BaseError & {
  __typename: 'UnknownError';
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

export type AuthErrorFragment = { __typename: 'AuthorizationError', message: string };

export type InvalidErrorFragment = { __typename: 'InvalidInputError', message: string };

export type NotFoundErrorFragment = { __typename: 'NotFoundError', message: string };

export type UnknownErrorFragment = { __typename: 'UnknownError', message: string };

export type HuntFragment = { __typename: 'Hunt', _id: string, created_by: string, name?: string | null, created_date?: string | null, start_date?: string | null, end_date?: string | null, is_active?: boolean | null, recall_message?: string | null };

export type LogoutFragment = { __typename: 'Logout', success?: boolean | null };

export type TokenFragment = { __typename: 'Token', _id: string, token: string };

export type UserFragmentFragment = { __typename: 'BaseUser', _id: string, user_name: string, first_name: string, last_name: string };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { login: { __typename: 'AuthorizationError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'Token', _id: string, token: string } | { __typename: 'UnknownError', message: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { logout: { __typename: 'AuthorizationError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'Logout', success?: boolean | null } | { __typename: 'NotFoundError', message: string } | { __typename: 'UnknownError', message: string } };

export type RegisterUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type RegisterUserMutation = { registerUser: { __typename: 'AuthorizationError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'Token', _id: string, token: string } | { __typename: 'UnknownError', message: string } };

export type GetUserFromTokenQueryVariables = Exact<{
  tkn: Scalars['String']['input'];
}>;


export type GetUserFromTokenQuery = { getUserFromToken: { __typename: 'AuthorizationError', message: string } | { __typename: 'BaseUser', _id: string, user_name: string, first_name: string, last_name: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'UnknownError', message: string } };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AnyError": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "UnknownError"
    ],
    "AuthPayload": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
      "Token",
      "UnknownError"
    ],
    "BaseError": [
      "AuthorizationError",
      "InvalidInputError",
      "NotFoundError",
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
    
export const AuthErrorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<AuthErrorFragment, unknown>;
export const InvalidErrorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvalidError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<InvalidErrorFragment, unknown>;
export const NotFoundErrorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotFoundError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<NotFoundErrorFragment, unknown>;
export const UnknownErrorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnknownError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnknownError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<UnknownErrorFragment, unknown>;
export const HuntFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hunt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hunt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_date"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"recall_message"}}]}}]} as unknown as DocumentNode<HuntFragment, unknown>;
export const LogoutFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Logout"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Logout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]} as unknown as DocumentNode<LogoutFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvalidError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotFoundError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UnknownError"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvalidError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotFoundError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnknownError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnknownError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Logout"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvalidError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotFoundError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UnknownError"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Logout"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Logout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvalidError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotFoundError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnknownError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnknownError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Token"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvalidError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotFoundError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UnknownError"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvalidError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotFoundError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnknownError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnknownError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetUserFromTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tkn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFromToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tkn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tkn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvalidError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotFoundError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UnknownError"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvalidError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotFoundError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnknownError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnknownError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GetUserFromTokenQuery, GetUserFromTokenQueryVariables>;