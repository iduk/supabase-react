import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
    // Ignore build output
    { ignores: ["dist"] },

    // Global language options
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },
    },

    // Base JS rules
    js.configs.recommended,

    // TypeScript rules (scoped by the config itself)
    ...tseslint.configs.recommended,

    // React-related rules (plugins in flat config style)
    {
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            // https://www.npmjs.com/package/eslint-plugin-react-hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
]
