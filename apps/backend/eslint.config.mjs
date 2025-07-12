import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintPluginN from "eslint-plugin-n";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
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
        parser: tseslint.parser, // Use tseslint parser
        parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.*.json"], // Adjust as needed for your project structure
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    plugins: {
        "@typescript-eslint": tseslint.plugin,
    },
    rules: {
        // Overrides and additions to recommended TypeScript rules
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
        "@typescript-eslint/no-explicit-any": "error", // Strict
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
            // Harmonized
            "warn",
            {
                ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                enforceConst: true,
            },
        ],
        "@typescript-eslint/no-empty-object-type": "off",
    },
};

// 🔹 Node.js specific rules
const nodeRules = {
    files: ["**/*.js", "**/*.ts", "**/*.mjs"], // Apply to all relevant Node.js files
    languageOptions: {
        globals: {
            ...globals.node, // Node.js global variables
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
        "n/no-unsupported-features/es-syntax": "off", // Allow modern ES syntax
        "n/no-process-exit": "error",
        "n/no-unpublished-import": ["error", { allowModules: [] }], // Adjust as needed
        "n/no-unpublished-require": ["error", { allowModules: [] }], // Adjust as needed
        "n/prefer-node-protocol": "error",
        "n/callback-return": "error",
        "n/handle-callback-err": "error",
        "n/no-callback-literal": "error",
        "n/no-mixed-requires": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
        "n/no-sync": ["error", { allowAtRootLevel: false }], // Disallow sync methods except at root
        "n/prefer-global/buffer": ["error", "always"],
        "n/prefer-global/console": ["error", "always"],
        "n/prefer-global/process": ["error", "always"],
        "n/prefer-global/url-search-params": ["error", "always"],
        "n/prefer-global/url": ["error", "always"],
        "n/prefer-promises/dns": "error",
        "n/prefer-promises/fs": "error",
    },
};

// 🔹 Unicorn plugin rules (common for both frontend/backend)
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
        "unicorn/prefer-node-protocol": "error", // Enforce for backend
    },
};

// 🔹 Security plugin rules (common for both frontend/backend)
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
        // From backend config, apply to frontend if relevant
        "security/detect-buffer-noassert": "error",
        "security/detect-non-literal-require": "warn",
        "security/detect-pseudoRandomBytes": "error",
    },
};

// 🔹 SonarJS Rules (backend specific, good for code quality)
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

// 🔹 General JavaScript Best Practices (common for both frontend/backend)
const commonJsBestPractices = {
    rules: {
        "no-console": ["warn", { allow: ["warn", "error", "info"] }], // Allow specific console methods
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
                    "for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries}, and iterate over the resulting array.",
            },
        ],
        "no-alert": "off", // Not relevant for backend
        "no-return-await": "error",
        "prefer-template": "error",
        "prefer-destructuring": ["warn", { object: true, array: false }],
        "no-lonely-if": "warn",
        "object-shorthand": ["error", "always"],
        "sort-imports": ["warn", { ignoreDeclarationSort: true }], // Let Prettier handle sorting
        "no-var": "error",
        "no-implied-eval": "error",
        "no-script-url": "error",
        "no-buffer-constructor": "error",
        "no-process-env": "warn", // Warn about direct process.env access
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

// ✅ Final ESLint config definition for Backend
export default defineConfig([
    ignorePatterns,
    {
        // Disable type-checking for plain JS files if any exist
        files: ["**/*.js", "**/*.mjs"],
        ...tseslint.configs.disableTypeChecked[0],
    },
    ...baseConfigs,
    commonTypeScriptRules,
    nodeRules,
    unicornRules,
    securityRules,
    sonarjsRules,
    commonJsBestPractices,
    enforceAliasImports,
    prettier,
]);
