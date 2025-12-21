import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
    eslintPluginReact.configs.flat.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        ignores: ["dist/**", "node_modules/**", "**/*.d.ts"],
        languageOptions: {
            ecmaVersion: "latest",
            parser: tsparser,
            globals: globals.browser,
        },

        plugins: {
            prettier: eslintPluginPrettier,
            reactPlugin: eslintPluginReact,
        },

        rules: {
            ...eslintConfigPrettier.rules,
            "react/react-in-jsx-scope": "off",
            "react/button-has-type": "error",
            "no-console": "warn",
            "prettier/prettier": "error",
        },
    },
];
