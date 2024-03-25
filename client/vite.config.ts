import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { createRequire } from "node:module";

// @ts-ignore
const req = createRequire(import.meta.url);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");
  return {
    define: {
      "process.env.GQL_SERVER_URL": JSON.stringify(env.GQL_SERVER_URL),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
    preview: {
      port: 8080,
    },
    plugins: [
      react(),
      svgrPlugin(),
      viteTsconfigPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      environment: "jsdom",
      globals: true,
      root: "src/",
      // setupFiles: "./vitest.setup.ts", // for msw setup if needed
    },
    typecheck: {
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"], // allows for tests to test against types
    },
    server: {
      open: true,
    },
    resolve: {
      alias: {
        "msw/native": req.resolve(
          path.resolve(__dirname, "./node_modules/msw/lib/native/index.mjs")
        ),
      },
    },
    build: {
      outDir: "build",
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: (id, { getModuleInfo }) => {
            if (
              id.includes("react-router-dom") ||
              id.includes("react-router") ||
              id.includes("react-dom")
            ) {
              // creating a @react-router chunk. Reducing the vendor chunk size
              return "@react-router";
            } else if (
              id.includes("node_modules/graphql/") ||
              id.includes("@apollo/")
            ) {
              // creating a @apollo chunk. Reducing the vendor chunk size
              return "@apollo";
            } else if (
              id.includes("antd") ||
              id.includes("ant-design") ||
              id.includes("rc-") ||
              id.includes("dayjs/")
            ) {
              // creating a @antd chunk. Reducing the vendor chunk size
              return "@antd";
            }
            // used to help with identifying packages
            // else {
            //   console.log(
            //     id,
            //     // getModuleInfo(id),
            //     "\n"
            //   );
            // }
          },
        },
      },
    },
  };
});
