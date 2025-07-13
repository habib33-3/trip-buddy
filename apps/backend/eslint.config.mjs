import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintPluginN from "eslint-plugin-n";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

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

// 🔹 Base recommended configs for JS and TS
const baseConfigs = [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
];

// 🔹 TypeScript rules
const typescriptRules = {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            project: ["./tsconfig.json", "./tsconfig.*.json"],
        },
    },
    plugins: {
        "@typescript-eslint": tseslint.plugin,
    },
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                args: "after-used",
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/ban-ts-comment": [
            "error",
            { "ts-expect-error": "allow-with-description" },
        ],
        "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
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
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/no-magic-numbers": [
            "warn",
            {
                ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                enforceConst: true,
            },
        ],
        "@typescript-eslint/no-empty-object-type": "off",
    },
};

// 🔹 Node.js rules for backend (express, etc)
const nodeRules = {
    files: ["**/*.js", "**/*.ts", "**/*.mjs"],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.es2021,
        },
    },
    plugins: {
        n: eslintPluginN,
    },
    rules: {
        "n/no-missing-require": "error",
        "n/no-extraneous-import": "error",
        "n/no-extraneous-require": "error",
        "n/no-unsupported-features/es-syntax": "off",
        "n/no-process-exit": "error",
        "n/no-unpublished-import": ["error", { allowModules: [] }],
        "n/no-unpublished-require": ["error", { allowModules: [] }],
        "n/prefer-node-protocol": "error",
        "n/callback-return": "error",
        "n/handle-callback-err": "error",
        "n/no-callback-literal": "error",
        "n/no-mixed-requires": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
        "n/no-sync": ["error", { allowAtRootLevel: false }],
        "n/prefer-global/buffer": ["error", "always"],
        "n/prefer-global/console": ["error", "always"],
        "n/prefer-global/process": ["error", "always"],
        "n/prefer-global/url-search-params": ["error", "always"],
        "n/prefer-global/url": ["error", "always"],
        "n/prefer-promises/dns": "error",
        "n/prefer-promises/fs": "error",
    },
};

// 🔹 Unicorn plugin rules
const unicornRules = {
    plugins: {
        unicorn: eslintPluginUnicorn,
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
        "unicorn/prefer-node-protocol": "error",
    },
};

// 🔹 Security plugin rules
const securityRules = {
    plugins: {
        security: eslintPluginSecurity,
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
        "security/detect-buffer-noassert": "error",
        "security/detect-non-literal-require": "warn",
        "security/detect-pseudoRandomBytes": "error",
    },
};

// 🔹 SonarJS rules for code quality
const sonarjsRules = {
    plugins: {
        sonarjs: eslintPluginSonarjs,
    },
    rules: {
        "sonarjs/no-all-duplicated-branches": "error",
        "sonarjs/no-element-overwrite": "error",
        "sonarjs/no-extra-arguments": "error",
        "sonarjs/no-identical-conditions": "error",
        "sonarjs/no-identical-expressions": "error",
        "sonarjs/no-one-iteration-loop": "error",
        "sonarjs/no-use-of-empty-return-value": "error",
        "sonarjs/no-collapsible-if": "error",
        "sonarjs/no-duplicate-string": "warn",
        "sonarjs/no-duplicated-branches": "error",
        "sonarjs/no-inverted-boolean-check": "error",
        "sonarjs/no-redundant-boolean": "error",
        "sonarjs/no-unused-collection": "error",
        "sonarjs/no-useless-catch": "error",
        "sonarjs/prefer-immediate-return": "error",
    },
};

// 🔹 Perfectionist plugin for sorting imports and objects
const perfectionistRules = {
    plugins: {
        perfectionist: eslintPluginPerfectionist,
    },
    rules: {
        "perfectionist/sort-objects": ["warn", { order: "asc", type: "natural" }],
    },
};

// 🔹 General JavaScript best practices
const commonJsBestPractices = {
    rules: {
        "no-console": ["warn", { allow: ["warn", "error", "info"] }],
        "no-implicit-coercion": "warn",
        "prefer-const": "error",
        "no-else-return": "warn",
        "no-unused-expressions": "error",
        "consistent-return": "warn",
        "eqeqeq": ["error", "always"],
        "no-throw-literal": "warn",
        "no-restricted-syntax": [
            "warn",
            {
                selector: "ForInStatement",
                message:
                    "for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} and iterate over the resulting array.",
            },
        ],
        "no-alert": "off",
        "no-return-await": "error",
        "prefer-template": "error",
        "prefer-destructuring": ["warn", { object: true, array: false }],
        "no-lonely-if": "warn",
        "object-shorthand": ["error", "always"],
        "sort-imports": ["warn", { ignoreDeclarationSort: true }],
        "no-var": "error",
        "no-implied-eval": "error",
        "no-script-url": "error",
        "no-buffer-constructor": "error",
        "no-process-env": "warn",
        "require-atomic-updates": "error",
        "no-caller": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-floating-decimal": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-multi-str": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        "radix": "error",
        "no-duplicate-imports": "error",
    },
};

// 🔹 Alias enforcement (no deep relative imports)
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

// ✅ Export final ESLint config for Express + TypeScript backend
export default defineConfig([
    ignorePatterns,
    {
        // Disable type-checked linting on plain JS files
        files: ["**/*.js", "**/*.mjs"],
        ...tseslint.configs.disableTypeChecked[0],
    },
    ...baseConfigs,
    typescriptRules,
    nodeRules,
    unicornRules,
    securityRules,
    sonarjsRules,
    perfectionistRules,
    commonJsBestPractices,
    enforceAliasImports,
    prettier,
]);
