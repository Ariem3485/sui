// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module.exports = {
    extends: ['next/core-web-vitals', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'react/jsx-no-bind': ['error'],
        'import/order': [
            'warn',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal', 'parent', 'sibling', 'index'],
                    'type',
                ],
                pathGroups: [
                    {
                        pattern: '{.,..}/**/*.?(s)css',
                        group: 'type',
                        position: 'after',
                    },
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc' },
                warnOnUnassignedImports: true,
            },
        ],
        'import/no-duplicates': ['error'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                disallowTypeAnnotations: true,
            },
        ],
        'import/no-duplicates': ['error'],
    },
};
