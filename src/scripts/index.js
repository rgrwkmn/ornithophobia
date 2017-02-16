import 'babel-polyfill';
import possessionState from './possession/state';

const transparent = false;
const antialias = false;
const game = new Phaser.Game(320, 240, Phaser.AUTO, '', this, transparent, antialias);

game.state.add('possession', possessionState, true);
