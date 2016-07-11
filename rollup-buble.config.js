import buble from 'rollup-plugin-buble';

export default {
  entry: 'lib/kopi.js',
  dest: 'kopi.js',
  format: 'umd',
  moduleName: 'Kopi',
  plugins: [ buble() ],
};
