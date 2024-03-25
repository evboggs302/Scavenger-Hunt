import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "storycap",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook", // for future viz diff work
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/addon-mdx-gfm",
    "msw-storybook-addon",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./vite.config.ts",
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
