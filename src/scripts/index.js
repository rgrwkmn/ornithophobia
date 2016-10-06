import 'babel-polyfill';
import possessionState from './possession/state';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('possession', possessionState, true);
