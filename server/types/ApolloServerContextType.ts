import type { Request } from "express";
import type { UserPayload } from "@generated/graphql";
import type { AccountDocument } from "@models/accounts";

export interface ApolloServerContext {
  req: Request;
  token: string;
  user: UserPayload;
  accounts: AccountDocument;
}
