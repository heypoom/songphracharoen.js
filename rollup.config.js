// @ts-check

const typescript = require('@rollup/plugin-typescript').default

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      file: 'dist/umd.js',
    },
    {
      format: 'iife',
      file: 'dist/script.js',
    },
  ],
  plugins: [
    typescript({
      compilerOptions: {
        lib: ['es5', 'es6', 'dom'],
        target: 'es5',
      },
    }),
  ],
}
