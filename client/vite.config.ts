import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");
  return {
    define: {
      "process.env.GQL_SERVER_URL": JSON.stringify(env.GQL_SERVER_URL),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
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
              id.includes("react-router") ||
              id.includes("react-dom")
            ) {
              return "@react-router";
            }
            // creating a @apollo chunk. Reducing the vendor chunk size
            else if (
              id.includes("node_modules/graphql/") ||
              id.includes("@apollo/client")
            ) {
              return "@apollo-client";
            }
            // creating a @material-ui chunk. Reducing the vendor chunk size
            else if (id.includes("material-ui")) {
              return "@material-ui";
            }
            // used to help with identifying packages
            // else {
            //   console.log(id);
            //   console.log(getModuleInfo(id));
            //   console.log("\n");
            // }
          },
        },
      },
    },
  };
});
