import 'babel-polyfill';
import possessionState from './possession/state';

var transparent = false;
var antialias = false;
var game = new Phaser.Game(320, 240, Phaser.AUTO, '', this, transparent, antialias);

game.state.add('possession', possessionState, true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbInBvc3Nlc3Npb25TdGF0ZSIsInRyYW5zcGFyZW50IiwiYW50aWFsaWFzIiwiZ2FtZSIsIlBoYXNlciIsIkdhbWUiLCJBVVRPIiwic3RhdGUiLCJhZGQiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQVA7QUFDQSxPQUFPQSxlQUFQLE1BQTRCLG9CQUE1Qjs7QUFFQSxJQUFNQyxjQUFjLEtBQXBCO0FBQ0EsSUFBTUMsWUFBWSxLQUFsQjtBQUNBLElBQU1DLE9BQU8sSUFBSUMsT0FBT0MsSUFBWCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQkQsT0FBT0UsSUFBakMsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsRUFBaURMLFdBQWpELEVBQThEQyxTQUE5RCxDQUFiOztBQUVBQyxLQUFLSSxLQUFMLENBQVdDLEdBQVgsQ0FBZSxZQUFmLEVBQTZCUixlQUE3QixFQUE4QyxJQUE5QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IHBvc3Nlc3Npb25TdGF0ZSBmcm9tICcuL3Bvc3Nlc3Npb24vc3RhdGUnO1xuXG5jb25zdCB0cmFuc3BhcmVudCA9IGZhbHNlO1xuY29uc3QgYW50aWFsaWFzID0gZmFsc2U7XG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDMyMCwgMjQwLCBQaGFzZXIuQVVUTywgJycsIHRoaXMsIHRyYW5zcGFyZW50LCBhbnRpYWxpYXMpO1xuXG5nYW1lLnN0YXRlLmFkZCgncG9zc2Vzc2lvbicsIHBvc3Nlc3Npb25TdGF0ZSwgdHJ1ZSk7XG4iXX0=