import { GraphQLResolveInfo } from "graphql";
import { UserResponsePayload } from "../../generated/graphql";
declare const userResolver: {
    Query: {
        getAllUsers: () => [UserResponsePayload];
        userNameExists: (parent: undefined, args: {
            userName: string;
        }, context: {}, info: GraphQLResolveInfo) => Promise<boolean>;
    };
};
export default userResolver;
