"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userResolver = {
    Query: {
        helloWorld: () => "Hello world from Apollo Server",
    },
};
exports.default = userResolver;
