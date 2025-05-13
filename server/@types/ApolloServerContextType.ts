import type { Request } from "express";
import { UserPayload } from "../generated/graphql";
import { AccountDocument } from "../models/accounts";

export interface ApolloServerContext {
  req: Request;
  token: string;
  user: UserPayload;
  accounts: AccountDocument;
}
