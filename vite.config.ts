/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';

const ReactCompilerConfig = {
    /* ... */
};

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
            },
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
} as UserConfig);
