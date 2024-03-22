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
    preview: {
      port: 8080,
    },
    plugins: [
      react(),
      svgrPlugin(),
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
            else {
              console.log(
                id,
                // getModuleInfo(id),
                "\n"
              );
            }
          },
        },
      },
    },
  };
});
