import js from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
// For common TypeScript configs
import reactPlugin from "eslint-plugin-react";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactX from "eslint-plugin-react-x";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import security from "eslint-plugin-security";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// 🔹 Ignore Patterns
const ignorePatterns = {
  ignores: [
    "**/dist/**",
    "**/node_modules/**",
    "**/coverage/**",
    "**/public/**",
    "**/views/**",
    "./src/generated/**",
    "**/*.mjs",
  ],
};

// 🔹 Base JavaScript and TypeScript Recommended Configs
const baseConfigs = [
  js.configs.recommended, // ESLint's recommended JavaScript rules
  ...tseslint.configs.recommended, // TypeScript ESLint recommended rules
  ...tseslint.configs.stylistic, // TypeScript ESLint stylistic rules
];

// 🔹 TypeScript Rules (common for both frontend/backend)
const commonTypeScriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: ["./tsconfig.json", "./tsconfig.*.json"], // Adjust as needed for your project structure
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    // Overrides and additions to recommended TypeScript rules
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_", // From backend config
        ignoreRestSiblings: true, // From frontend config
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/no-explicit-any": "error", // Strict
    "@typescript-eslint/ban-ts-comment": [
      "error", // Stricter than original frontend config
      { "ts-expect-error": "allow-with-description" },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off", // Often too strict for React components
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/await-thenable": "error", // From backend config
    "@typescript-eslint/promise-function-async": "error", // From backend config
    "@typescript-eslint/no-require-imports": "error", // From backend config
    "@typescript-eslint/no-var-requires": "error", // From backend config
    "@typescript-eslint/no-magic-numbers": [
      // Harmonized
      "warn",
      {
        ignore: [
          -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 400, 401, 403, 404, 500,
        ],
        enforceConst: true,
      },
    ],
    "@typescript-eslint/no-empty-object-type": "off", // From backend config
  },
};

// 🔹 React specific configurations
const reactConfigs = {
  files: ["**/*.tsx", "**/*.jsx"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      React: "readonly",
      JSX: "readonly",
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "jsx-a11y": jsxA11y,
    "react-x": reactX,
    "react-dom": reactDom,
    react: reactPlugin,
  },
  rules: {
    ...reactRecommended.rules, // React recommended rules
    ...jsxRuntime.rules, // Rules for new JSX transform
    ...reactHooks.configs.recommended.rules, // React Hooks rules
    ...(reactX.configs?.["recommended-typescript"]?.rules ?? {}), // React-x rules
    ...(reactDom.configs?.recommended?.rules ?? {}), // React-dom rules

    // React specific overrides and additions
    "react/jsx-uses-react": "off", // Not needed with new JSX transform
    "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
    "react/prop-types": "off", // Use TypeScript for type checking
    "react/jsx-key": "error",
    "react/self-closing-comp": "warn",
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-boolean-value": "warn",
    "react/destructuring-assignment": ["error", "always"],
    "react/no-array-index-key": "warn",
    "react/no-deprecated": "warn",
    "react/no-danger": "error",
    "react/no-unstable-nested-components": "warn",
    "react/jsx-no-leaked-render": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/no-unused-prop-types": "warn",
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never" },
    ],
    "react-hooks/exhaustive-deps": "warn", // Ensure all dependencies are listed

    // JSX A11y rules
    ...jsxA11y.configs.recommended.rules,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
  },
};

// 🔹 TanStack Query plugin rules
const tanstackQueryRules = {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    "@tanstack/eslint-plugin-query": eslintPluginQuery,
  },
  rules: {
    "@tanstack/eslint-plugin-query/exhaustive-deps": "error",
    "@tanstack/eslint-plugin-query/stable-query-client": "error",
  },
};

// 🔹 Unicorn plugin rules (common for both frontend/backend)
const unicornRules = {
  plugins: {
    unicorn,
  },
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: ["^[A-Za-z0-9]+\\.[A-Za-z0-9]+$"],
      },
    ],
    "unicorn/prefer-module": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-node-protocol": "off", // More relevant for backend, but harmless here
  },
};

// 🔹 Tailwind CSS plugin rules
const tailwindRules = {
  plugins: {
    "better-tailwindcss": tailwindPlugin,
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/index.css", // Adjust if your main CSS file is elsewhere
    },
  },
  rules: {
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    "better-tailwindcss/no-unnecessary-whitespace": "warn",
    "better-tailwindcss/enforce-consistent-class-order": "off",
    "better-tailwindcss/no-duplicate-classes": "warn",
    "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
    "better-tailwindcss/no-unregistered-classes": "warn",
    "better-tailwindcss/no-conflicting-classes": "warn",
    "better-tailwindcss/no-restricted-classes": "warn",
  },
};

// 🔹 General JavaScript Best Practices (common for both frontend/backend)
const commonJsBestPractices = {
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "info"] }], // Allow specific console methods
    "no-implicit-coercion": "warn",
    "prefer-const": "error",
    "no-else-return": "warn",
    "no-unused-expressions": "error", // Stricter than original frontend config
    "consistent-return": "warn",
    eqeqeq: ["error", "always"],
    "no-throw-literal": "warn",
    "no-restricted-syntax": [
      "warn",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
    ],
    "no-alert": "warn", // Frontend specific, but keeping here as a general warning
    "no-return-await": "error",
    "prefer-template": "error",
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "no-lonely-if": "warn",
    "object-shorthand": ["error", "always"],
    "sort-imports": ["warn", { ignoreDeclarationSort: true }], // Let Prettier handle sorting
    "no-var": "error", // From backend config
    "no-implied-eval": "error", // From backend config
    "no-script-url": "error", // From backend config
    "no-caller": "error", // From backend config
    "no-eval": "error", // From backend config
    "no-extend-native": "error", // From backend config
    "no-extra-bind": "error", // From backend config
    "no-floating-decimal": "error", // From backend config
    "no-iterator": "error", // From backend config
    "no-labels": "error", // From backend config
    "no-lone-blocks": "error", // From backend config
    "no-multi-str": "error", // From backend config
    "no-new-func": "error", // From backend config
    "no-new-wrappers": "error", // From backend config
    "no-octal-escape": "error", // From backend config
    "no-proto": "error", // From backend config
    "no-self-compare": "error", // From backend config
    "no-sequences": "error", // From backend config
    "no-useless-call": "error", // From backend config
    "no-useless-concat": "error", // From backend config
    "no-useless-return": "error", // From backend config
    "no-void": "error", // From backend config
    "no-with": "error", // From backend config
    "prefer-promise-reject-errors": "error", // From backend config
    radix: "error", // From backend config
    "no-duplicate-imports": "off", // From backend config
  },
};

// 🔹 Security plugin rules (common for both frontend/backend)
const securityRules = {
  plugins: {
    security,
  },
  rules: {
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "warn",
    "security/detect-child-process": "error", // Error for frontend as well
    "security/detect-disable-mustache-escape": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
    "security/detect-no-csrf-before-method-override": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    // From backend config, apply to frontend if relevant
    "security/detect-buffer-noassert": "error",
    "security/detect-non-literal-require": "warn",
    "security/detect-pseudoRandomBytes": "error",
  },
};

// 🔹 No Unsanitized rules (common for both frontend/backend, but more critical for frontend)
const noUnsanitizedRules = {
  plugins: {
    "no-unsanitized": noUnsanitized,
  },
  rules: {
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
  },
};

// 🔹 Alias enforcement (no relative deep imports) (common for both frontend/backend)
const enforceAliasImports = {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../../*", "../../../*"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // Ensure TypeScript path aliases are resolved
    },
  },
};

// ✅ Final ESLint config definition for Frontend
export default defineConfig([
  ignorePatterns,
  ...baseConfigs,
  commonTypeScriptRules,
  reactConfigs,
  tanstackQueryRules,
  unicornRules,
  commonJsBestPractices,
  securityRules,
  noUnsanitizedRules,
  enforceAliasImports,
  tailwindRules,
  prettier, // Always put prettier last to disable conflicting rules
]);
