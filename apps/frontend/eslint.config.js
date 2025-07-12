import js from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactX from "eslint-plugin-react-x";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import security from "eslint-plugin-security";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

// 🔹 Base JS config
const baseJsConfig = js.configs.recommended;

// 🔹 TypeScript config
const typescriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: ["./tsconfig.json", "./tsconfig.*.json"],
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
    ...typescriptPlugin.configs["recommended-requiring-type-checking"].rules,
    ...typescriptPlugin.configs["strict-type-checked"].rules,

    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
  },
};

// 🔹 React recommended config with version detection
const reactRecommendedConfig = {
  ...reactRecommended,
  settings: {
    react: {
      version: "detect",
    },
  },
};

// 🔹 JSX runtime config from React
const reactJsxRuntimeConfig = jsxRuntime;

// 🔹 React Hooks
const reactHooksRules = {
  plugins: {
    "react-hooks": reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-hooks/exhaustive-deps": "warn",
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

// 🔹 Unicorn plugin rules
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
    "unicorn/prefer-node-protocol": "off",
  },
};

// 🔹 Tailwind plugin rules
const tailwindRules = {
  plugins: {
    "better-tailwindcss": tailwindPlugin,
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/index.css",
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

// 🔹 Global React and JS best practices
const globalReactRules = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      React: "readonly",
      JSX: "readonly",
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  rules: {
    // React rules
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
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

    // JS best practices
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-implicit-coercion": "warn",
    "prefer-const": "error",
    "no-else-return": "warn",
    "no-unused-expressions": "warn",
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
    "no-alert": "warn",
    "no-magic-numbers": [
      "warn",
      {
        ignore: [
          0, 1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 400, 401, 403, 404, 500,
        ],
        enforceConst: true,
      },
    ],
    "no-return-await": "error",
    "prefer-template": "error",
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "no-lonely-if": "warn",
    "object-shorthand": ["error", "always"],
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
  },
};

// 🔹 Accessibility (JSX A11y) rules
const jsxA11yRules = {
  plugins: {
    "jsx-a11y": jsxA11y,
  },
  rules: {
    ...jsxA11y.recommended,
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

// 🔹 Security plugin rules
const securityRules = {
  plugins: {
    security,
  },
  rules: {
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "warn",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
    "security/detect-no-csrf-before-method-override": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-non-literal-fs-filename": "warn",
  },
};

// 🔹 Unsanitized rules
const noUnsanitizedRules = {
  plugins: {
    "no-unsanitized": noUnsanitized,
  },
  rules: {
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
  },
};

// 🔹 React DOM and React X plugin rules
const reactDomReactXRules = {
  plugins: {
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    ...(reactX.configs?.["recommended-typescript"]?.rules ?? {}),
    ...(reactDom.configs?.recommended?.rules ?? {}),
  },
};

// 🔹 Alias enforcement (no relative deep imports)
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
      typescript: {},
    },
  },
};

// ✅ Final ESLint config definition
export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/"]),
  baseJsConfig,
  typescriptRules,
  reactRecommendedConfig,
  reactJsxRuntimeConfig,
  reactHooksRules,
  tanstackQueryRules,
  unicornRules,
  globalReactRules,
  jsxA11yRules,
  securityRules,
  noUnsanitizedRules,
  reactDomReactXRules,
  enforceAliasImports,
  tailwindRules,
  prettier,
]);
