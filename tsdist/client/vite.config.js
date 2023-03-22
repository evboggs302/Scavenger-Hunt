"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = require("@vitejs/plugin-react");
const vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
const vite_plugin_svgr_1 = require("vite-plugin-svgr");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)(), (0, vite_tsconfig_paths_1.default)(), (0, vite_plugin_svgr_1.default)()],
    server: {
        open: true,
    },
    build: {
        outDir: "build",
    },
});
