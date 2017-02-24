import 'babel-polyfill';
import levelTester from './levelTester/state';

const transparent = false;
const antialias = false;
const game = new Phaser.Game(320, 240, Phaser.AUTO, '', window, transparent, antialias);

game.state.add('levelTester', levelTester, true);
