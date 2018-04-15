import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'index.ts',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  experimentalDynamicImport: true,
  plugins: [
    resolve(),
    typescript({
      clean: true,
    }),
  ]
};