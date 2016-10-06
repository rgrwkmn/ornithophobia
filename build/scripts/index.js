import 'babel-polyfill';
import possessionState from './possession/state';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('possession', possessionState, true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbInBvc3Nlc3Npb25TdGF0ZSIsImdhbWUiLCJQaGFzZXIiLCJHYW1lIiwiQVVUTyIsInN0YXRlIiwiYWRkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFQO0FBQ0EsT0FBT0EsZUFBUCxNQUE0QixvQkFBNUI7O0FBRUEsSUFBTUMsT0FBTyxJQUFJQyxPQUFPQyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCRCxPQUFPRSxJQUFqQyxFQUF1QyxFQUF2QyxDQUFiOztBQUVBSCxLQUFLSSxLQUFMLENBQVdDLEdBQVgsQ0FBZSxZQUFmLEVBQTZCTixlQUE3QixFQUE4QyxJQUE5QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IHBvc3Nlc3Npb25TdGF0ZSBmcm9tICcuL3Bvc3Nlc3Npb24vc3RhdGUnO1xuXG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDgwMCwgNjAwLCBQaGFzZXIuQVVUTywgJycpO1xuXG5nYW1lLnN0YXRlLmFkZCgncG9zc2Vzc2lvbicsIHBvc3Nlc3Npb25TdGF0ZSwgdHJ1ZSk7XG4iXX0=