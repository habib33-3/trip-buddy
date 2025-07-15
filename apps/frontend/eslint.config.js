import js from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactX from "eslint-plugin-react-x";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
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
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
];

// 🔹 TypeScript Rules
const commonTypeScriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: "latest",
      project: ["./tsconfig.json", "./tsconfig.*.json"],
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    "@typescript-eslint/array-type": ["warn", { default: "generic" }],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-expect-error": "allow-with-description" },
    ],
    "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        selector: "variableLike",
      },
    ],
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        enforceConst: true,
        ignore: [
          -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 400, 401, 403, 404, 500,
        ],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-enum-initializers": "warn",

    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",

    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",

    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      {
        allowAny: false,
        allowBoolean: false,
        allowNumber: true,
      },
    ],
    "@typescript-eslint/sort-type-constituents": "warn",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/typedef": [
      "warn",
      {
        arrowParameter: false,
        memberVariableDeclaration: true,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    "@typescript-eslint/unified-signatures": "warn",
  },
};

// 🔹 React Rules
const reactConfigs = {
  files: ["**/*.tsx", "**/*.jsx"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      JSX: "readonly",
      React: "readonly",
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  plugins: {
    "jsx-a11y": jsxA11y,
    react: reactPlugin,
    "react-dom": reactDom,
    "react-hooks": reactHooks,
    "react-x": reactX,
  },
  rules: {
    ...reactRecommended.rules,
    ...jsxRuntime.rules,
    ...reactHooks.configs.recommended.rules,
    ...(reactX.configs?.["recommended-typescript"]?.rules ?? {}),
    ...(reactDom.configs?.recommended?.rules ?? {}),
    ...jsxA11y.configs.recommended.rules,
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["invalidHref", "preferButton"],
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
      },
    ],
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "react/destructuring-assignment": ["error", "always"],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": [
      "warn",
      { children: "never", props: "never" },
    ],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react/jsx-key": "error",
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-leaked-render": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-uses-react": "off",
    "react/no-array-index-key": "warn",
    "react/no-danger": "error",
    "react/no-deprecated": "warn",
    "react/no-unstable-nested-components": "warn",
    "react/no-unused-prop-types": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

// 🔹 TanStack Query Rules
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

// 🔹 Tailwind Rules
const tailwindRules = {
  plugins: {
    "better-tailwindcss": tailwindPlugin,
  },
  rules: {
    "better-tailwindcss/enforce-consistent-class-order": "off",
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
    "better-tailwindcss/no-conflicting-classes": "warn",
    "better-tailwindcss/no-duplicate-classes": "warn",
    "better-tailwindcss/no-restricted-classes": "warn",
    "better-tailwindcss/no-unnecessary-whitespace": "warn",
    "better-tailwindcss/no-unregistered-classes": "warn",
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/index.css",
    },
  },
};

// 🔹 Unicorn Rules
const unicornRules = {
  plugins: {
    unicorn,
  },
  rules: {
    "unicorn/error-message": "warn",
    "unicorn/explicit-length-check": "warn",
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
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-empty-file": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-null": "off",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-undefined": "warn",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat": "warn",
    "unicorn/prefer-array-flat-map": "warn",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-default-parameters": "warn",
    "unicorn/prefer-logical-operator-over-ternary": "warn",
    "unicorn/prefer-module": "error",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-ternary": "warn",
    "unicorn/prevent-abbreviations": "off",
  },
};

// 🔹 Import Rules (Disabled import/order to avoid circular fix warning)
const importRules = {
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": "error",
    "import/order": "off", // Disabled to avoid conflict with perfectionist
  },
};

// 🔹 Perfectionist Rules (Keeping this for import sorting)
const perfectionistRules = {
  plugins: {
    perfectionist,
  },
  rules: {
    "perfectionist/sort-objects": ["warn", { order: "asc", type: "natural" }],
  },
};

// 🔹 SonarJS Rules
const sonarjsRules = {
  plugins: {
    sonarjs,
  },
  rules: {
    "sonarjs/no-all-duplicated-branches": "warn",
    "sonarjs/no-duplicate-string": "warn",
    "sonarjs/no-identical-conditions": "warn",
    "sonarjs/no-small-switch": "warn",
    "sonarjs/prefer-immediate-return": "warn",
    "sonarjs/prefer-single-boolean-return": "warn",
  },
};

// 🔹 Common JS Best Practices
const commonJsBestPractices = {
  rules: {
    "consistent-return": "warn",
    eqeqeq: ["error", "always"],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-else-return": "warn",
    "no-eval": "error",
    "no-implicit-coercion": "warn",
    "no-implied-eval": "error",
    "no-lonely-if": "warn",
    "no-return-await": "error",
    "no-throw-literal": "warn",
    "no-unused-expressions": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always"],
    "prefer-const": "error",
    "prefer-destructuring": ["warn", { array: false, object: true }],
    "prefer-template": "error",
    "sort-imports": ["off", { ignoreDeclarationSort: true }],
  },
};

// 🔹 Security & Sanitization
const securityRules = {
  plugins: { security },
  rules: {
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
    "security/detect-no-csrf-before-method-override": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-non-literal-require": "warn",
    "security/detect-object-injection": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-pseudoRandomBytes": "error",
    "security/detect-unsafe-regex": "warn",
  },
};

const noUnsanitizedRules = {
  plugins: { "no-unsanitized": noUnsanitized },
  rules: {
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
  },
};

// 🔹 Alias enforcement
const enforceAliasImports = {
  rules: {
    "no-restricted-imports": ["error", { patterns: ["../../*", "../../../*"] }],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};

// ✅ Final Config Export
export default defineConfig([
  ignorePatterns,
  ...baseConfigs,
  commonTypeScriptRules,
  reactConfigs,
  tanstackQueryRules,
  tailwindRules,
  unicornRules,
  importRules,
  perfectionistRules,
  sonarjsRules,
  commonJsBestPractices,
  securityRules,
  noUnsanitizedRules,
  enforceAliasImports,
  prettier,
]);
