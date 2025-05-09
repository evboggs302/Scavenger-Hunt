import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AllUsersPayloadKeySpecifier = ('_id' | 'account' | 'email' | 'first_name' | 'hunts' | 'last_name' | 'user_name' | AllUsersPayloadKeySpecifier)[];
export type AllUsersPayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	hunts?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	user_name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthPayloadKeySpecifier = ('_id' | 'token' | AuthPayloadKeySpecifier)[];
export type AuthPayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CluePayloadKeySpecifier = ('_id' | 'description' | 'hunt_id' | 'order_number' | 'responses' | CluePayloadKeySpecifier)[];
export type CluePayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	hunt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	order_number?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HuntKeySpecifier = ('_id' | 'balance_usd' | 'clues' | 'created_by' | 'created_date' | 'end_date' | 'is_active' | 'marked_complete' | 'name' | 'recall_message' | 'start_date' | 'teams' | 'twilio_number' | HuntKeySpecifier)[];
export type HuntFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	balance_usd?: FieldPolicy<any> | FieldReadFunction<any>,
	clues?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	created_date?: FieldPolicy<any> | FieldReadFunction<any>,
	end_date?: FieldPolicy<any> | FieldReadFunction<any>,
	is_active?: FieldPolicy<any> | FieldReadFunction<any>,
	marked_complete?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	recall_message?: FieldPolicy<any> | FieldReadFunction<any>,
	start_date?: FieldPolicy<any> | FieldReadFunction<any>,
	teams?: FieldPolicy<any> | FieldReadFunction<any>,
	twilio_number?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('activateHunt' | 'createHunt' | 'createMultipleClues' | 'createMultipleTeams' | 'createSingleClue' | 'createSingleTeam' | 'deleteAllCluesByHuntId' | 'deleteAllResponsesByHunt' | 'deleteAllResponsesByTeam' | 'deleteAllTeamsByHuntId' | 'deleteClueById' | 'deleteHuntById' | 'deleteTeam' | 'deleteUser' | 'login' | 'logout' | 'markHuntComplete' | 'markResponseCorrect' | 'registerUser' | 'sendHint' | 'updateClueDescription' | 'updateClueOrder' | 'updateHunt' | 'updateTeam' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	createHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleClues?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleTeams?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleClue?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllCluesByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllResponsesByHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllResponsesByTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllTeamsByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteClueById?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteHuntById?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	markHuntComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	markResponseCorrect?: FieldPolicy<any> | FieldReadFunction<any>,
	registerUser?: FieldPolicy<any> | FieldReadFunction<any>,
	sendHint?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTeam?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('deleteAllHuntsByUser' | 'emailExists' | 'getAllUsers' | 'getCluesByHuntId' | 'getHunt' | 'getHuntsByUserId' | 'getResponsesByClue' | 'getResponsesByHunt' | 'getResponsesByTeam' | 'getTeam' | 'getTeamsByHuntId' | 'getUserFromToken' | 'userNameExists' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	deleteAllHuntsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	emailExists?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	getCluesByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	getHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	getHuntsByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByClue?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	getTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	getTeamsByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserFromToken?: FieldPolicy<any> | FieldReadFunction<any>,
	userNameExists?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResponsePayloadKeySpecifier = ('_id' | 'clue_id' | 'correct' | 'hint_sent' | 'response_img' | 'response_txt' | 'team_id' | 'time_received' | ResponsePayloadKeySpecifier)[];
export type ResponsePayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	clue_id?: FieldPolicy<any> | FieldReadFunction<any>,
	correct?: FieldPolicy<any> | FieldReadFunction<any>,
	hint_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	response_img?: FieldPolicy<any> | FieldReadFunction<any>,
	response_txt?: FieldPolicy<any> | FieldReadFunction<any>,
	team_id?: FieldPolicy<any> | FieldReadFunction<any>,
	time_received?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResponsesByHuntKeySpecifier = ('count' | 'responses' | ResponsesByHuntKeySpecifier)[];
export type ResponsesByHuntFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('responseReceived' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	responseReceived?: FieldPolicy<any> | FieldReadFunction<any>
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
export type UserPayloadKeySpecifier = ('_id' | 'account' | 'email' | 'first_name' | 'last_name' | 'user_name' | UserPayloadKeySpecifier)[];
export type UserPayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	user_name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AllUsersPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllUsersPayloadKeySpecifier | (() => undefined | AllUsersPayloadKeySpecifier),
		fields?: AllUsersPayloadFieldPolicy,
	},
	AuthPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthPayloadKeySpecifier | (() => undefined | AuthPayloadKeySpecifier),
		fields?: AuthPayloadFieldPolicy,
	},
	CluePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CluePayloadKeySpecifier | (() => undefined | CluePayloadKeySpecifier),
		fields?: CluePayloadFieldPolicy,
	},
	Hunt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HuntKeySpecifier | (() => undefined | HuntKeySpecifier),
		fields?: HuntFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	ResponsePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResponsePayloadKeySpecifier | (() => undefined | ResponsePayloadKeySpecifier),
		fields?: ResponsePayloadFieldPolicy,
	},
	ResponsesByHunt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResponsesByHuntKeySpecifier | (() => undefined | ResponsesByHuntKeySpecifier),
		fields?: ResponsesByHuntFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	Team?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TeamKeySpecifier | (() => undefined | TeamKeySpecifier),
		fields?: TeamFieldPolicy,
	},
	UserPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserPayloadKeySpecifier | (() => undefined | UserPayloadKeySpecifier),
		fields?: UserPayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;