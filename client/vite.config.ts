import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import commonJsPlugin from "@rollup/plugin-commonjs";

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
      commonJsPlugin(),
      viteTsconfigPaths(),
      splitVendorChunkPlugin(),
    ],
    server: {
      open: true,
    },
    build: {
      outDir: "build",
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: (id, { getModuleInfo }) => {
            // creating a @react-router chunk. Reducing the vendor chunk size
            if (
              id.includes("react-router-dom") ||
              id.includes("react-router")
            ) {
              return "@react-router";
            }
            // creating a @apollo chunk. Reducing the vendor chunk size
            else if (id.includes("node_modules/graphql/")) {
              return "@gql";
            }
            // creating a @antd chunk. Reducing the vendor chunk size
            else if (id.includes("antd")) {
              return "@antd";
            }
            // used to help with identifying packages
            else {
              console.log(id);
              console.log(getModuleInfo(id));
              console.log("\n");
            }
          },
        },
      },
    },
  };
});
