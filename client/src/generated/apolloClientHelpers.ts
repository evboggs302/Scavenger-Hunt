import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthorizationErrorKeySpecifier = ('message' | AuthorizationErrorKeySpecifier)[];
export type AuthorizationErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseErrorKeySpecifier = ('message' | BaseErrorKeySpecifier)[];
export type BaseErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseUserKeySpecifier = ('_id' | 'first_name' | 'last_name' | 'user_name' | BaseUserKeySpecifier)[];
export type BaseUserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	user_name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClueKeySpecifier = ('_id' | 'description' | 'hunt_id' | 'order_number' | 'responses' | ClueKeySpecifier)[];
export type ClueFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	hunt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	order_number?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CorrectResponseKeySpecifier = ('correct' | CorrectResponseKeySpecifier)[];
export type CorrectResponseFieldPolicy = {
	correct?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteKeySpecifier = ('success' | DeleteKeySpecifier)[];
export type DeleteFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HintSentKeySpecifier = ('sent' | HintSentKeySpecifier)[];
export type HintSentFieldPolicy = {
	sent?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HuntKeySpecifier = ('_id' | 'clues' | 'created_by' | 'created_date' | 'end_date' | 'is_active' | 'name' | 'recall_message' | 'start_date' | 'teams' | HuntKeySpecifier)[];
export type HuntFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	clues?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	created_date?: FieldPolicy<any> | FieldReadFunction<any>,
	end_date?: FieldPolicy<any> | FieldReadFunction<any>,
	is_active?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	recall_message?: FieldPolicy<any> | FieldReadFunction<any>,
	start_date?: FieldPolicy<any> | FieldReadFunction<any>,
	teams?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvalidInputErrorKeySpecifier = ('message' | InvalidInputErrorKeySpecifier)[];
export type InvalidInputErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LogoutKeySpecifier = ('success' | LogoutKeySpecifier)[];
export type LogoutFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createHunt' | 'createMultipleClues' | 'createMultipleTeams' | 'createSingleClue' | 'createSingleTeam' | 'deleteAllCluesByHuntId' | 'deleteAllResponsesByHunt' | 'deleteAllResponsesByTeam' | 'deleteClueById' | 'deleteHuntById' | 'deleteTeam' | 'login' | 'logout' | 'markResponseCorrect' | 'registerUser' | 'sendHint' | 'updateClueDescription' | 'updateClueOrder' | 'updateHunt' | 'updateTeam' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleClues?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleTeams?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleClue?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllCluesByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllResponsesByHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllResponsesByTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteClueById?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteHuntById?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	markResponseCorrect?: FieldPolicy<any> | FieldReadFunction<any>,
	registerUser?: FieldPolicy<any> | FieldReadFunction<any>,
	sendHint?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTeam?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotFoundErrorKeySpecifier = ('message' | NotFoundErrorKeySpecifier)[];
export type NotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activateHunt' | 'deactivateHunt' | 'deleteAllHuntsByUser' | 'getAllUsers' | 'getCluesByHuntId' | 'getHunt' | 'getHuntsByUserId' | 'getResponsesByClue' | 'getResponsesByTeam' | 'getTeam' | 'getTeamsByHuntId' | 'getUserFromToken' | 'userNameExists' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	deactivateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllHuntsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	getCluesByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	getHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	getHuntsByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByClue?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	getTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	getTeamsByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserFromToken?: FieldPolicy<any> | FieldReadFunction<any>,
	userNameExists?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResponsesKeySpecifier = ('_id' | 'clue_id' | 'correct' | 'hint_sent' | 'response_txt' | 'team_id' | 'time_received' | ResponsesKeySpecifier)[];
export type ResponsesFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	clue_id?: FieldPolicy<any> | FieldReadFunction<any>,
	correct?: FieldPolicy<any> | FieldReadFunction<any>,
	hint_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	response_txt?: FieldPolicy<any> | FieldReadFunction<any>,
	team_id?: FieldPolicy<any> | FieldReadFunction<any>,
	time_received?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TeamKeySpecifier = ('_id' | 'device_number' | 'hunt_id' | 'last_clue_sent' | 'members' | 'recall_sent' | 'responses' | TeamKeySpecifier)[];
export type TeamFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	device_number?: FieldPolicy<any> | FieldReadFunction<any>,
	hunt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	last_clue_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	recall_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenKeySpecifier = ('_id' | 'token' | TokenKeySpecifier)[];
export type TokenFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnknownErrorKeySpecifier = ('message' | UnknownErrorKeySpecifier)[];
export type UnknownErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'first_name' | 'hunts' | 'last_name' | 'user_name' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	hunts?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	user_name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AuthorizationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorizationErrorKeySpecifier | (() => undefined | AuthorizationErrorKeySpecifier),
		fields?: AuthorizationErrorFieldPolicy,
	},
	BaseError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseErrorKeySpecifier | (() => undefined | BaseErrorKeySpecifier),
		fields?: BaseErrorFieldPolicy,
	},
	BaseUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseUserKeySpecifier | (() => undefined | BaseUserKeySpecifier),
		fields?: BaseUserFieldPolicy,
	},
	Clue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClueKeySpecifier | (() => undefined | ClueKeySpecifier),
		fields?: ClueFieldPolicy,
	},
	CorrectResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CorrectResponseKeySpecifier | (() => undefined | CorrectResponseKeySpecifier),
		fields?: CorrectResponseFieldPolicy,
	},
	Delete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteKeySpecifier | (() => undefined | DeleteKeySpecifier),
		fields?: DeleteFieldPolicy,
	},
	HintSent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HintSentKeySpecifier | (() => undefined | HintSentKeySpecifier),
		fields?: HintSentFieldPolicy,
	},
	Hunt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HuntKeySpecifier | (() => undefined | HuntKeySpecifier),
		fields?: HuntFieldPolicy,
	},
	InvalidInputError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvalidInputErrorKeySpecifier | (() => undefined | InvalidInputErrorKeySpecifier),
		fields?: InvalidInputErrorFieldPolicy,
	},
	Logout?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LogoutKeySpecifier | (() => undefined | LogoutKeySpecifier),
		fields?: LogoutFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotFoundErrorKeySpecifier | (() => undefined | NotFoundErrorKeySpecifier),
		fields?: NotFoundErrorFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Responses?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResponsesKeySpecifier | (() => undefined | ResponsesKeySpecifier),
		fields?: ResponsesFieldPolicy,
	},
	Team?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TeamKeySpecifier | (() => undefined | TeamKeySpecifier),
		fields?: TeamFieldPolicy,
	},
	Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenKeySpecifier | (() => undefined | TokenKeySpecifier),
		fields?: TokenFieldPolicy,
	},
	UnknownError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnknownErrorKeySpecifier | (() => undefined | UnknownErrorKeySpecifier),
		fields?: UnknownErrorFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;