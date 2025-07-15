import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");

  return {
    name: "node-config",
    define: {
      "process.env.SERVER_URL_GQL": JSON.stringify(env.SERVER_URL_GQL),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
    plugins: [viteTsconfigPaths()],
    test: {
      environment: "node",
      globals: true,
      root: "./test/__tests__",
      isolate: true,
      passWithNoTests: true,
      fileParallelism: true,
      minWorkers: 2,
      coverage: {
        provider: "v8",
        reporter: ["text", "json"],
        include: [
          "controllers/**/*",
          "models/**/*",
          "resolvers/**/*",
          "utils/**/*",
        ],
      },
    },
  };
});
