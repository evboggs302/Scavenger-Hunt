import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");

  return {
    define: {
      "process.env.SERVER_URL_GQL": JSON.stringify(env.SERVER_URL_GQL),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
    test: {
      environment: "node",
      globals: true,
      root: "./__tests__",
      isolate: true,
    },
  };
});
