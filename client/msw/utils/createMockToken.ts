import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export const createMockToken = async () => {
  const token = await new SignJWT({ id: "mock-id" })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return token;
};
