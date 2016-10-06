var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { randomCoords } from 'ornithophobia/utilities';

function createBaddie(game) {
  var _game$add;

  var baddie = (_game$add = game.add).sprite.apply(_game$add, _toConsumableArray(randomCoords(game.world.width, game.world.height)).concat(['baddie']));
  baddie.animations.add('left', [0, 1], 10, true);
  baddie.animations.add('right', [2, 3], 10, true);
  return baddie;
}

var State = function (_Phaser$State) {
  _inherits(State, _Phaser$State);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'preload',
    value: function preload() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('diamond', 'assets/diamond.png');
      this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
      this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.add.sprite(0, 0, 'sky');

      // add some the player can possess
      this.possessables = this.add.group();
      this.possessables.enableBody = true;

      Array(5).fill().forEach(function () {
        var baddie = createBaddie(_this2);
        _this2.possessables.add(baddie);
        baddie.body.collideWorldBounds = true;
      });

      // add player
      this.player = this.add.sprite(32, this.world.height - 150, 'dude');
      this.physics.arcade.enable(this.player);
      this.player.body.collideWorldBounds = true;
      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.collide(this.player, this.possessables);
      this.game.physics.arcade.collide(this.possessables, this.possessables);

      var cursors = this.game.input.keyboard.createCursorKeys();

      //  Reset the this.players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      this.possessables.forEach(function (possessable) {
        possessable.frame = 1;
      });

      switch (true) {
        case cursors.up.isDown:
          this.player.body.velocity.y = -150;
          break;
        case cursors.down.isDown:
          this.player.body.velocity.y = 150;
          break;
      }
      switch (true) {
        case cursors.left.isDown:
          this.player.body.velocity.x = -150;
          this.player.animations.play('left');
          break;
        case cursors.right.isDown:
          this.player.body.velocity.x = 150;
          this.player.animations.play('right');
          break;
        default:
          this.player.frame = 4;
      }
    }
  }]);

  return State;
}(Phaser.State);

export default State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsicmFuZG9tQ29vcmRzIiwiY3JlYXRlQmFkZGllIiwiZ2FtZSIsImJhZGRpZSIsImFkZCIsInNwcml0ZSIsIndvcmxkIiwid2lkdGgiLCJoZWlnaHQiLCJhbmltYXRpb25zIiwiU3RhdGUiLCJsb2FkIiwiaW1hZ2UiLCJzcHJpdGVzaGVldCIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJwb3NzZXNzYWJsZXMiLCJncm91cCIsImVuYWJsZUJvZHkiLCJBcnJheSIsImZpbGwiLCJmb3JFYWNoIiwiYm9keSIsImNvbGxpZGVXb3JsZEJvdW5kcyIsInBsYXllciIsImFyY2FkZSIsImVuYWJsZSIsImNvbGxpZGUiLCJjdXJzb3JzIiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJ2ZWxvY2l0eSIsIngiLCJ5IiwicG9zc2Vzc2FibGUiLCJmcmFtZSIsInVwIiwiaXNEb3duIiwiZG93biIsImxlZnQiLCJwbGF5IiwicmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxZQUFULFFBQTZCLHlCQUE3Qjs7QUFFQSxTQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixNQUFNQyxTQUFTLGtCQUFLQyxHQUFMLEVBQVNDLE1BQVQscUNBQW1CTCxhQUFhRSxLQUFLSSxLQUFMLENBQVdDLEtBQXhCLEVBQStCTCxLQUFLSSxLQUFMLENBQVdFLE1BQTFDLENBQW5CLFVBQXNFLFFBQXRFLEdBQWY7QUFDQUwsU0FBT00sVUFBUCxDQUFrQkwsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEIsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUE5QixFQUF3QyxFQUF4QyxFQUE0QyxJQUE1QztBQUNBRCxTQUFPTSxVQUFQLENBQWtCTCxHQUFsQixDQUFzQixPQUF0QixFQUErQixDQUFFLENB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QkFBWUMsS0FBWixHQUFvQixDQUFwQjtBQUNELE9BRkQ7O0FBSUEsY0FBUSxJQUFSO0FBQ0EsYUFBS1IsUUFBUVMsRUFBUixDQUFXQyxNQUFoQjtBQUNFLGVBQUtkLE1BQUwsQ0FBWUYsSUFBWixDQUFpQlUsUUFBakIsQ0FBMEJFLENBQTFCLEdBQThCLENBQUMsR0FBL0I7QUFDQTtBQUNGLGFBQUtOLFFBQVFXLElBQVIsQ0FBYUQsTUFBbEI7QUFDRSxlQUFLZCxNQUFMLENBQVlGLElBQVosQ0FBaUJVLFFBQWpCLENBQTBCRSxDQUExQixHQUE4QixHQUE5QjtBQUNBO0FBTkY7QUFRQSxjQUFRLElBQVI7QUFDQSxhQUFLTixRQUFRWSxJQUFSLENBQWFGLE1BQWxCO0FBQ0UsZUFBS2QsTUFBTCxDQUFZRixJQUFaLENBQWlCVSxRQUFqQixDQUEwQkMsQ0FBMUIsR0FBOEIsQ0FBQyxHQUEvQjtBQUNBLGVBQUtULE1BQUwsQ0FBWWxCLFVBQVosQ0FBdUJtQyxJQUF2QixDQUE0QixNQUE1QjtBQUNBO0FBQ0YsYUFBS2IsUUFBUWMsS0FBUixDQUFjSixNQUFuQjtBQUNFLGVBQUtkLE1BQUwsQ0FBWUYsSUFBWixDQUFpQlUsUUFBakIsQ0FBMEJDLENBQTFCLEdBQThCLEdBQTlCO0FBQ0EsZUFBS1QsTUFBTCxDQUFZbEIsVUFBWixDQUF1Qm1DLElBQXZCLENBQTRCLE9BQTVCO0FBQ0E7QUFDRjtBQUNFLGVBQUtqQixNQUFMLENBQVlZLEtBQVosR0FBb0IsQ0FBcEI7QUFWRjtBQVlEOzs7O0VBaEVpQnZCLE9BQU9OLEs7O0FBbUUzQixlQUFlQSxLQUFmIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmFuZG9tQ29vcmRzIH0gZnJvbSAnb3JuaXRob3Bob2JpYS91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBjcmVhdGVCYWRkaWUoZ2FtZSkge1xuICBjb25zdCBiYWRkaWUgPSBnYW1lLmFkZC5zcHJpdGUoLi4ucmFuZG9tQ29vcmRzKGdhbWUud29ybGQud2lkdGgsIGdhbWUud29ybGQuaGVpZ2h0KSwgJ2JhZGRpZScpO1xuICBiYWRkaWUuYW5pbWF0aW9ucy5hZGQoJ2xlZnQnLCBbIDAsIDEgXSwgMTAsIHRydWUpO1xuICBiYWRkaWUuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgWyAyLCAzIF0sIDEwLCB0cnVlKTtcbiAgcmV0dXJuIGJhZGRpZTtcbn1cblxuY2xhc3MgU3RhdGUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICBwcmVsb2FkKCkge1xuICAgIHRoaXMubG9hZC5pbWFnZSgnc2t5JywgJ2Fzc2V0cy9za3kucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdncm91bmQnLCAnYXNzZXRzL3BsYXRmb3JtLnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnc3RhcicsICdhc3NldHMvc3Rhci5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2RpYW1vbmQnLCAnYXNzZXRzL2RpYW1vbmQucG5nJyk7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdkdWRlJywgJ2Fzc2V0cy9kdWRlLnBuZycsIDMyLCA0OCk7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdiYWRkaWUnLCAnYXNzZXRzL2JhZGRpZS5wbmcnLCAzMiwgMzIpO1xuICB9XG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3NreScpO1xuXG4gICAgLy8gYWRkIHNvbWUgdGhlIHBsYXllciBjYW4gcG9zc2Vzc1xuICAgIHRoaXMucG9zc2Vzc2FibGVzID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLnBvc3Nlc3NhYmxlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIEFycmF5KDUpLmZpbGwoKS5mb3JFYWNoKCgpID0+IHtcbiAgICAgIGNvbnN0IGJhZGRpZSA9IGNyZWF0ZUJhZGRpZSh0aGlzKTtcbiAgICAgIHRoaXMucG9zc2Vzc2FibGVzLmFkZChiYWRkaWUpO1xuICAgICAgYmFkZGllLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBwbGF5ZXJcbiAgICB0aGlzLnBsYXllciA9IHRoaXMuYWRkLnNwcml0ZSgzMiwgdGhpcy53b3JsZC5oZWlnaHQgLSAxNTAsICdkdWRlJyk7XG4gICAgdGhpcy5waHlzaWNzLmFyY2FkZS5lbmFibGUodGhpcy5wbGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIFsgMCwgMSwgMiwgMyBdLCAxMCwgdHJ1ZSk7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgWyA1LCA2LCA3LCA4IF0sIDEwLCB0cnVlKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucG9zc2Vzc2FibGVzKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBvc3Nlc3NhYmxlcywgdGhpcy5wb3NzZXNzYWJsZXMpO1xuXG4gICAgY29uc3QgY3Vyc29ycyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG5cbiAgICAvLyAgUmVzZXQgdGhlIHRoaXMucGxheWVycyB2ZWxvY2l0eSAobW92ZW1lbnQpXG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuXG4gICAgdGhpcy5wb3NzZXNzYWJsZXMuZm9yRWFjaChwb3NzZXNzYWJsZSA9PiB7XG4gICAgICBwb3NzZXNzYWJsZS5mcmFtZSA9IDE7XG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIGN1cnNvcnMudXAuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTE1MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY3Vyc29ycy5kb3duLmlzRG93bjpcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDE1MDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIGN1cnNvcnMubGVmdC5pc0Rvd246XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtMTUwO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdsZWZ0Jyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMTUwO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMucGxheWVyLmZyYW1lID0gNDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4iXX0=