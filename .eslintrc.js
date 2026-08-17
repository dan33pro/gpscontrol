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
        "prettier/prettier": ["error", { "endOfLine": "auto" }],
        "semi": ["error", "always"],
    },
    overrides: [
        {
            files: ['**/__tests__/**/*', '**/*.test.js', '**/*.test.jsx'],
            rules: {
                'react/display-name': 'off',
                '@next/next/no-img-element': 'off',
            },
        },
    ],
};