// Rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'build/scripts/index.js',
  dest: 'build/bundle.js',
  format: 'iife',
  globals: {
    // phaser: 'Phaser'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
};
