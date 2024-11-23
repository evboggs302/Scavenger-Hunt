import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import autoAlias from "vite-plugin-auto-alias";
import deadFile from "vite-plugin-deadfile";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");
  return {
    define: {
      "process.env.GQL_SERVER_URL": JSON.stringify(env.GQL_SERVER_URL),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
    plugins: [
      react({ plugins: [["@swc/plugin-styled-components", {}]] }),
      svgrPlugin(),
      viteTsconfigPaths(),
      autoAlias(), // writes the aliases in tsconfig
      deadFile({
        include: ["src/**"],
        exclude: ["**/*.graphql", "**/*.(spec|test|stories).(ts|tsx)"],
        outputDir: "./.deadfiles",
        output: "dead-files.txt", // writes this txt file with all unused files
      }),
      visualizer({ open: !!!process.env.PROD, gzipSize: !!!process.env.PROD }),
    ],
    preview: {
      port: 8080,
    },
    server: {
      open: true,
    },
    test: {
      environment: "jsdom",
      globals: true,
      root: "src/",
    },
    optimizeDeps: {
      force: true,
    },
    build: {
      outDir: "build",
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        treeshake: "recommended",
        output: {
          compact: true,
          minifyInternalExports: true,
          // manualChunks: (id, { getModuleInfo }) => {
          //   if (
          //     id.includes("/react-router-dom") ||
          //     id.includes("/react-router") ||
          //     id.includes("/@remix")
          //   ) {
          //     // creating a @react-router chunk. Reducing the vendor chunk size
          //     return "@react-router";
          //   }
          //   // creating a @apollo chunk. Reducing the vendor chunk size
          //   else if (
          //     id.includes("node_modules/graphql/") ||
          //     id.includes("node_modules/@apollo/")
          //   ) {
          //     return "@apollo";
          //   }
          //   // creating another chunk. Reducing the vendor chunk size
          //   // else if (id.includes("/styled-components") || id.includes("/zod")) {
          //   //   return "@styled-zod";
          //   // }
          //   // creating another chunk. Reducing the vendor chunk size
          //   // else if (
          //   //   id.includes("/@hookform") ||
          //   //   id.includes("react-hook-form")
          //   // ) {
          //   //   return "@hookform";
          //   // }
          //   // creating another chunk. Reducing the vendor chunk size
          //   // else if (id.includes("/react-dom") || id.includes("/react")) {
          //   //   return "@dom";
          //   // }
          //   // creating another chunk. Reducing the vendor chunk size
          //   else if (id.includes("/@ant-design")) {
          //     return "@ant-design";
          //   }
          //   // creating a @antd chunk. Reducing the vendor chunk size
          //   else if (id.includes("/antd")) {
          //     return "@antd";
          //   }
          //   // creating another chunk. Reducing the vendor chunk size
          //   // else if (id.includes("")) {
          //   //   return "";
          //   // }
          //   // creating a @vendor chunk
          //   else {
          //     const info = getModuleInfo(id);
          //     if (info?.meta?.commonjs?.isCommonJS) {
          //       return "@cjs-vendor";
          //     } else if (info?.code?.includes("createContext")) {
          //       console.log(getModuleInfo(id), "\n");
          //     }
          //   }
          // },
        },
      },
    },
  };
});
