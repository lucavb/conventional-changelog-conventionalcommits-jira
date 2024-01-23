import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
const dependencies = Object.keys(pkg.dependencies || {});
const peerDependencies = Object.keys(pkg.peerDependencies || {});

export default [
    // ESM build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/conventional-changelog-conventionalcommits-jira.mjs',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
        external: [...dependencies, ...peerDependencies],
    },
    // CommonJS build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/conventional-changelog-conventionalcommits-jira.cjs',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
        external: [...dependencies, ...peerDependencies],
    },
];
