import { defineConfig, loadEnv } from "vite";
import reactSWC from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// for DEV purposes only
import { visualizer } from "rollup-plugin-visualizer";
import deadFile from "vite-plugin-deadfile";
import autoAlias from "vite-plugin-auto-alias";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");
  const clientPort = +env.CLIENT_PORT;

  const autoAliasPlugin = ["development", "analyze"].includes(mode)
    ? autoAlias()
    : undefined;
  const deadFilePlugin =
    mode === "analyze"
      ? deadFile({
          include: ["src/**"],
          exclude: ["**/*.graphql", "**/*.(spec|test|stories).(ts|tsx)"],
          outputDir: "./.deadfiles",
          output: "dead-files.txt", // writes this txt file with all unused files
        })
      : undefined;
  const visualizerPlugin =
    mode === "analyze"
      ? visualizer({ open: !process.env.PROD, gzipSize: !process.env.PROD })
      : undefined;

  return {
    define: {
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
      "process.env.SERVER_URL_GQL": JSON.stringify(env.SERVER_URL_GQL),
      "process.env.SERVER_URL_SUBSCRIPTION": JSON.stringify(
        env.SERVER_URL_SUBSCRIPTION
      ),
    },
    plugins: [
      reactSWC({
        plugins: [["@swc/plugin-styled-components", {}]],
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      autoAliasPlugin,
      deadFilePlugin,
      visualizerPlugin,
    ],
    preview: {
      port: 8080,
    },
    server: {
      open: true,
      port: clientPort || 8585,
    },
    test: {
      environment: "jsdom",
      globals: true,
      dir: "src",
      fileParallelism: true,
      minWorkers: 2,
      setupFiles: "./src/test/setupTests.ts",
      browser: {
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
    },
    build: {
      outDir: "build",
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        treeshake: true,
        output: {
          compact: true,
          minifyInternalExports: true,
          manualChunks: (id, { getModuleInfo }) => {
            if (
              id.includes("/react-router") ||
              id.includes("/react-router") ||
              id.includes("/@remix")
            ) {
              // creating a @react-router chunk. Reducing the vendor chunk size
              return "@react-router";
            }
            if (id.includes("/@mui")) {
              // creating a vendor chunk
              return "@mui-vendor";
            }
            // else {
            //   const info = getModuleInfo(id);
            //   if (info?.meta?.commonjs?.isCommonJS) {
            //     return "@cjs-vendor";
            //   } else if (info?.code?.includes("createContext")) {
            //     console.log(getModuleInfo(id), "\n");
            //   }
            // }
          },
        },
      },
    },
  };
});
