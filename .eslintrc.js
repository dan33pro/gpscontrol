module.exports = {
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "next",
        "next/core-web-vitals",
        'plugin:jest/recommended',
    ],
    plugins: [
        'testing-library',
        'jest',
    ],
    rules: {
        "semi": ["error", "always"],
    },
};