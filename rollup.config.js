// Rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scripts/index.js',
  dest: 'build/bundle.js',
  format: 'iife',
  globals: {
    phaser: 'Phaser',
    pixi: 'PIXI',
    p2: 'p2'
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