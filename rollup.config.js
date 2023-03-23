// @ts-check

const typescript = require('@rollup/plugin-typescript').default
const dts = require('rollup-plugin-dts').default

/** @type {import('rollup').RollupOptions[]} */
module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'umd',
        file: 'dist/index.js',
      },
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },
  {
    // path to your declaration files root
    input: './dist/dts/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'es'}],
    plugins: [dts()],
  },
]
