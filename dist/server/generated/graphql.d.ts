import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export type AddUserInput = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    userName: Scalars['String'];
};
export type Clue = {
    __typename: 'Clue';
    _id?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    hunt_id?: Maybe<Scalars['String']>;
    order_number?: Maybe<Scalars['Int']>;
};
export type CluesListItem = {
    description?: InputMaybe<Scalars['String']>;
    order_number?: InputMaybe<Scalars['Int']>;
};
export type CreateCluesInput = {
    cluesList?: InputMaybe<Array<InputMaybe<CluesListItem>>>;
    hunt_id?: InputMaybe<Scalars['ID']>;
};
export type Mutation = {
    __typename: 'Mutation';
    addUser?: Maybe<UserResponsePayload>;
    createClues?: Maybe<Array<Maybe<Clue>>>;
    deleteAllCluesByHuntId?: Maybe<Scalars['Boolean']>;
    deleteClueById?: Maybe<Scalars['Boolean']>;
    updateClueDescription?: Maybe<Clue>;
    updateClueOrder?: Maybe<Array<Maybe<Clue>>>;
};
export type MutationAddUserArgs = {
    input: AddUserInput;
};
export type MutationCreateCluesArgs = {
    input: CreateCluesInput;
};
export type MutationDeleteAllCluesByHuntIdArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteClueByIdArgs = {
    id: Scalars['ID'];
};
export type MutationUpdateClueDescriptionArgs = {
    input: UpdateClueDescriptionInput;
};
export type MutationUpdateClueOrderArgs = {
    input: UpdateClueOrderInput;
};
export type Query = {
    __typename: 'Query';
    getActiveUser?: Maybe<UserResponsePayload>;
    getAllUsers?: Maybe<Array<Maybe<UserResponsePayload>>>;
    getCluesByHuntId?: Maybe<Array<Maybe<Clue>>>;
    getFirstClueByHuntId?: Maybe<Clue>;
};
export type QueryGetCluesByHuntIdArgs = {
    id: Scalars['ID'];
};
export type QueryGetFirstClueByHuntIdArgs = {
    id: Scalars['ID'];
};
export type UpdateClueDescriptionInput = {
    id: Scalars['ID'];
    newDesc?: InputMaybe<Scalars['String']>;
};
export type UpdateClueOrderInput = {
    newOrder?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};
export type User = {
    __typename: 'User';
    _id?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    hunts?: Maybe<Array<Maybe<Scalars['String']>>>;
    lastName?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    userName?: Maybe<Scalars['String']>;
};
export type UserResponsePayload = {
    __typename: 'UserResponsePayload';
    _id?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    hunts?: Maybe<Array<Maybe<Scalars['String']>>>;
    lastName?: Maybe<Scalars['String']>;
    userName?: Maybe<Scalars['String']>;
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
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    AddUserInput: AddUserInput;
    String: ResolverTypeWrapper<Scalars['String']>;
    Clue: ResolverTypeWrapper<Clue>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    CluesListItem: CluesListItem;
    CreateCluesInput: CreateCluesInput;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Mutation: ResolverTypeWrapper<{}>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Query: ResolverTypeWrapper<{}>;
    UpdateClueDescriptionInput: UpdateClueDescriptionInput;
    UpdateClueOrderInput: UpdateClueOrderInput;
    User: ResolverTypeWrapper<User>;
    UserResponsePayload: ResolverTypeWrapper<UserResponsePayload>;
    AdditionalEntityFields: AdditionalEntityFields;
};
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    AddUserInput: AddUserInput;
    String: Scalars['String'];
    Clue: Clue;
    Int: Scalars['Int'];
    CluesListItem: CluesListItem;
    CreateCluesInput: CreateCluesInput;
    ID: Scalars['ID'];
    Mutation: {};
    Boolean: Scalars['Boolean'];
    Query: {};
    UpdateClueDescriptionInput: UpdateClueDescriptionInput;
    UpdateClueOrderInput: UpdateClueOrderInput;
    User: User;
    UserResponsePayload: UserResponsePayload;
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
export type IdDirectiveArgs = {};
export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type LinkDirectiveArgs = {
    overrideType?: Maybe<Scalars['String']>;
};
export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type EmbeddedDirectiveArgs = {};
export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type MapDirectiveArgs = {
    path: Scalars['String'];
};
export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type ClueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Clue'] = ResolversParentTypes['Clue']> = {
    _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hunt_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    order_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    addUser?: Resolver<Maybe<ResolversTypes['UserResponsePayload']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
    createClues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<MutationCreateCluesArgs, 'input'>>;
    deleteAllCluesByHuntId?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAllCluesByHuntIdArgs, 'id'>>;
    deleteClueById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteClueByIdArgs, 'id'>>;
    updateClueDescription?: Resolver<Maybe<ResolversTypes['Clue']>, ParentType, ContextType, RequireFields<MutationUpdateClueDescriptionArgs, 'input'>>;
    updateClueOrder?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<MutationUpdateClueOrderArgs, 'input'>>;
};
export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    getActiveUser?: Resolver<Maybe<ResolversTypes['UserResponsePayload']>, ParentType, ContextType>;
    getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserResponsePayload']>>>, ParentType, ContextType>;
    getCluesByHuntId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Clue']>>>, ParentType, ContextType, RequireFields<QueryGetCluesByHuntIdArgs, 'id'>>;
    getFirstClueByHuntId?: Resolver<Maybe<ResolversTypes['Clue']>, ParentType, ContextType, RequireFields<QueryGetFirstClueByHuntIdArgs, 'id'>>;
};
export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hunts?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type UserResponsePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponsePayload'] = ResolversParentTypes['UserResponsePayload']> = {
    _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    hunts?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type Resolvers<ContextType = any> = {
    Clue?: ClueResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserResponsePayload?: UserResponsePayloadResolvers<ContextType>;
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
export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[];
    };
}
declare const result: PossibleTypesResultData;
export default result;
