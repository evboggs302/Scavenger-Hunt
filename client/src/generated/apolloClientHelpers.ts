import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthPayloadKeySpecifier = ('_id' | 'token' | AuthPayloadKeySpecifier)[];
export type AuthPayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CluePayloadKeySpecifier = ('_id' | 'description' | 'hunt_id' | 'order_number' | 'responses' | 'results' | CluePayloadKeySpecifier)[];
export type CluePayloadFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	hunt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	order_number?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>,
	results?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateSubscriptionPayloadKeySpecifier = ('clientSecret' | 'id' | CreateSubscriptionPayloadKeySpecifier)[];
export type CreateSubscriptionPayloadFieldPolicy = {
	clientSecret?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerSubscriptionKeySpecifier = ('amount' | 'description' | 'id' | 'priceId' | 'status' | CustomerSubscriptionKeySpecifier)[];
export type CustomerSubscriptionFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	priceId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HuntKeySpecifier = ('_id' | 'balance_usd' | 'clues' | 'created_by' | 'created_date' | 'end_date' | 'is_active' | 'marked_complete' | 'name' | 'recall_message' | 'results' | 'start_date' | 'teams' | 'twilio_number' | HuntKeySpecifier)[];
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
	results?: FieldPolicy<any> | FieldReadFunction<any>,
	start_date?: FieldPolicy<any> | FieldReadFunction<any>,
	teams?: FieldPolicy<any> | FieldReadFunction<any>,
	twilio_number?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('activateHunt' | 'cancelSubscription' | 'createHunt' | 'createMultipleClues' | 'createMultipleTeams' | 'createSingleClue' | 'createSingleTeam' | 'createSubscription' | 'deleteAllCluesByHuntId' | 'deleteAllResponsesByHunt' | 'deleteAllResponsesByTeam' | 'deleteAllTeamsByHuntId' | 'deleteClueById' | 'deleteHuntById' | 'deleteTeam' | 'deleteUser' | 'login' | 'logout' | 'markHuntComplete' | 'markResponseCorrect' | 'registerUser' | 'resubscribe' | 'sendHint' | 'updateClueDescription' | 'updateClueOrder' | 'updateHunt' | 'updateTeam' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
	createHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleClues?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleTeams?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleClue?: FieldPolicy<any> | FieldReadFunction<any>,
	createSingleTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	createSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
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
	resubscribe?: FieldPolicy<any> | FieldReadFunction<any>,
	sendHint?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClueOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updateHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTeam?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentCardKeySpecifier = ('brand' | 'last4' | PaymentCardKeySpecifier)[];
export type PaymentCardFieldPolicy = {
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	last4?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentMethodKeySpecifier = ('brand' | 'id' | 'last4' | PaymentMethodKeySpecifier)[];
export type PaymentMethodFieldPolicy = {
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last4?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('deleteAllHuntsByUser' | 'emailExists' | 'fetchCustomerSubscription' | 'fetchStripeCharges' | 'fetchStripePaymentMethod' | 'fetchSubscriptionProduct' | 'getCluesByHuntId' | 'getHunt' | 'getHuntsByUserId' | 'getResponsesByClue' | 'getResponsesByHunt' | 'getResponsesByTeam' | 'getResults' | 'getTeam' | 'getTeamsByHuntId' | 'getUserFromToken' | 'userNameExists' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	deleteAllHuntsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	emailExists?: FieldPolicy<any> | FieldReadFunction<any>,
	fetchCustomerSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
	fetchStripeCharges?: FieldPolicy<any> | FieldReadFunction<any>,
	fetchStripePaymentMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	fetchSubscriptionProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	getCluesByHuntId?: FieldPolicy<any> | FieldReadFunction<any>,
	getHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	getHuntsByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByClue?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByHunt?: FieldPolicy<any> | FieldReadFunction<any>,
	getResponsesByTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	getResults?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type ResultsKeySpecifier = ('avg_response_time' | 'rejection_ratio' | ResultsKeySpecifier)[];
export type ResultsFieldPolicy = {
	avg_response_time?: FieldPolicy<any> | FieldReadFunction<any>,
	rejection_ratio?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripeChargeKeySpecifier = ('amount' | 'date' | 'description' | 'id' | 'paymentCard' | 'paymentIntent' | 'status' | StripeChargeKeySpecifier)[];
export type StripeChargeFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentCard?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentIntent?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripePaymentIntentKeySpecifier = ('id' | StripePaymentIntentKeySpecifier)[];
export type StripePaymentIntentFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripeSubscriptionKeySpecifier = ('amount' | 'description' | 'id' | 'priceId' | StripeSubscriptionKeySpecifier)[];
export type StripeSubscriptionFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	priceId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('responseReceived' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	responseReceived?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionProductKeySpecifier = ('amount' | 'description' | 'id' | 'priceId' | SubscriptionProductKeySpecifier)[];
export type SubscriptionProductFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	priceId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TeamKeySpecifier = ('_id' | 'device_number' | 'hunt_id' | 'last_clue_sent' | 'members' | 'recall_sent' | 'responses' | 'results' | TeamKeySpecifier)[];
export type TeamFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	device_number?: FieldPolicy<any> | FieldReadFunction<any>,
	hunt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	last_clue_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	recall_sent?: FieldPolicy<any> | FieldReadFunction<any>,
	responses?: FieldPolicy<any> | FieldReadFunction<any>,
	results?: FieldPolicy<any> | FieldReadFunction<any>
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
	AuthPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthPayloadKeySpecifier | (() => undefined | AuthPayloadKeySpecifier),
		fields?: AuthPayloadFieldPolicy,
	},
	CluePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CluePayloadKeySpecifier | (() => undefined | CluePayloadKeySpecifier),
		fields?: CluePayloadFieldPolicy,
	},
	CreateSubscriptionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateSubscriptionPayloadKeySpecifier | (() => undefined | CreateSubscriptionPayloadKeySpecifier),
		fields?: CreateSubscriptionPayloadFieldPolicy,
	},
	CustomerSubscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerSubscriptionKeySpecifier | (() => undefined | CustomerSubscriptionKeySpecifier),
		fields?: CustomerSubscriptionFieldPolicy,
	},
	Hunt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HuntKeySpecifier | (() => undefined | HuntKeySpecifier),
		fields?: HuntFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PaymentCard?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentCardKeySpecifier | (() => undefined | PaymentCardKeySpecifier),
		fields?: PaymentCardFieldPolicy,
	},
	PaymentMethod?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentMethodKeySpecifier | (() => undefined | PaymentMethodKeySpecifier),
		fields?: PaymentMethodFieldPolicy,
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
	Results?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResultsKeySpecifier | (() => undefined | ResultsKeySpecifier),
		fields?: ResultsFieldPolicy,
	},
	StripeCharge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripeChargeKeySpecifier | (() => undefined | StripeChargeKeySpecifier),
		fields?: StripeChargeFieldPolicy,
	},
	StripePaymentIntent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripePaymentIntentKeySpecifier | (() => undefined | StripePaymentIntentKeySpecifier),
		fields?: StripePaymentIntentFieldPolicy,
	},
	StripeSubscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripeSubscriptionKeySpecifier | (() => undefined | StripeSubscriptionKeySpecifier),
		fields?: StripeSubscriptionFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	SubscriptionProduct?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionProductKeySpecifier | (() => undefined | SubscriptionProductKeySpecifier),
		fields?: SubscriptionProductFieldPolicy,
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