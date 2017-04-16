var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TiledInterpreter from './TiledInterpreter';
import { collect, consume, knockDoor, knockGate } from './interactions';

/**
 * Extend this instead of Phaser.State to handle a Tiled level
 * @type {Object}
 */

var TiledLevelState = function (_Phaser$State) {
  _inherits(TiledLevelState, _Phaser$State);

  function TiledLevelState() {
    _classCallCheck(this, TiledLevelState);

    return _possibleConstructorReturn(this, (TiledLevelState.__proto__ || Object.getPrototypeOf(TiledLevelState)).apply(this, arguments));
  }

  _createClass(TiledLevelState, [{
    key: 'init',
    value: function init(_ref) {
      var mapPath = _ref.mapPath;

      this.tiledLevel = {
        mapPath: mapPath,
        mapName: mapPath
      };

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    }
  }, {
    key: 'preload',
    value: function preload() {
      var _tiledLevel = this.tiledLevel,
          mapName = _tiledLevel.mapName,
          mapPath = _tiledLevel.mapPath;

      this.preloadTilemap(mapName, mapPath, null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('player', '/assets/sprites/dog.gif', 24, 16);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var mapName = this.tiledLevel.mapName;

      this.game.stage.backgroundColor = '#000';
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // have the game centered on screen
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.map = this.createTilemap(mapName);

      this.tiledLevel.mapLayers = [];
      this.tiledLevel.collideLayers = [];

      this.map.layers.forEach(function (layer) {
        var createdLayer = _this2.map.createLayer(layer.name);
        createdLayer.resizeWorld();
        _this2.tiledLevel.mapLayers.push(createdLayer);
        if (layer.properties.impassable) {
          _this2.tiledLevel.collideLayers.push(createdLayer);
          _this2.map.setCollisionByExclusion([], true, createdLayer);
        }
      });

      var objectsByType = this.getTilemapObjectsByType(this.tilemap);

      if (objectsByType.Consumable) {
        this.tiledLevel.consumables = this.game.add.group();
        this.tiledLevel.consumables.enableBody = true;
        var consumables = objectsByType.Consumable;
        consumables.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.consumables);
        });
      }

      if (objectsByType.Key) {
        this.tiledLevel.keys = this.game.add.group();
        this.tiledLevel.keys.enableBody = true;
        var keys = objectsByType.Key;
        keys.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.keys);
        });
      }

      if (objectsByType.Door) {
        this.tiledLevel.doors = this.game.add.group();
        this.tiledLevel.doors.enableBody = true;
        var doors = objectsByType.Door;
        doors.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.doors);
          sprite.body.moves = false;
        });
      }

      if (objectsByType.Gate) {
        this.tiledLevel.gates = this.game.add.group();
        this.tiledLevel.gates.enableBody = true;
        var gates = objectsByType.Gate;
        gates.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.gates);
          sprite.body.moves = false;
        });
      }

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = objectsByType.PlayerStart[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y - playerStart.height, 'player');
      this.physics.arcade.enable(this.player);
      this.player.animations.add('walk', [0, 2], 8, true);
      this.player.animations.add('sit', [3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6], 8, true);
      this.player.scale.x = -1;
      this.player.anchor.setTo(0.5, 1);
      this.player.body.setSize(10, 8, 3, 8);
      this.game.camera.follow(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.tiledLevel.collideLayers.forEach(function (layer) {
        _this3.game.physics.arcade.collide(_this3.player, layer);
      });
      this.game.physics.arcade.overlap(this.player, this.tiledLevel.consumables, consume, null, this);
      this.game.physics.arcade.overlap(this.player, this.tiledLevel.keys, collect, null, this);
      this.game.physics.arcade.collide(this.player, this.tiledLevel.doors, knockDoor, null, this);
      this.game.physics.arcade.collide(this.player, this.tiledLevel.gates, knockGate, null, this);
      //  Reset the this.players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      var direction = '';
      switch (true) {
        case this.cursors.left.isDown:
          direction += 'left';
          this.player.body.velocity.x = -50;
          this.player.scale.x = 1;
          break;
        case this.cursors.right.isDown:
          direction += 'right';
          this.player.body.velocity.x = 50;
          this.player.scale.x = -1;
          break;
      }

      switch (true) {
        case this.cursors.up.isDown:
          direction += 'up';
          this.player.body.velocity.y = -50;
          break;
        case this.cursors.down.isDown:
          direction += 'down';
          this.player.body.velocity.y = 50;
          break;
      }

      if (direction) {
        this.player.animations.play('walk');
      } else {
        this.player.animations.play('sit');
      }
    }
  }]);

  return TiledLevelState;
}(Phaser.State);

Object.assign(TiledLevelState.prototype, TiledInterpreter);
export default TiledLevelState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2VuZ2luZS9UaWxlZExldmVsU3RhdGUuanMiXSwibmFtZXMiOlsiVGlsZWRJbnRlcnByZXRlciIsImNvbGxlY3QiLCJjb25zdW1lIiwia25vY2tEb29yIiwia25vY2tHYXRlIiwiVGlsZWRMZXZlbFN0YXRlIiwibWFwUGF0aCIsInRpbGVkTGV2ZWwiLCJtYXBOYW1lIiwiUGhhc2VyIiwiQ2FudmFzIiwic2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCIsImdhbWUiLCJjYW52YXMiLCJwcmVsb2FkVGlsZW1hcCIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwibG9hZCIsInNwcml0ZXNoZWV0Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzY2FsZSIsInNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlNIT1dfQUxMIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsIm1hcCIsImNyZWF0ZVRpbGVtYXAiLCJtYXBMYXllcnMiLCJjb2xsaWRlTGF5ZXJzIiwibGF5ZXJzIiwiZm9yRWFjaCIsImNyZWF0ZWRMYXllciIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJuYW1lIiwicmVzaXplV29ybGQiLCJwdXNoIiwicHJvcGVydGllcyIsImltcGFzc2FibGUiLCJzZXRDb2xsaXNpb25CeUV4Y2x1c2lvbiIsIm9iamVjdHNCeVR5cGUiLCJnZXRUaWxlbWFwT2JqZWN0c0J5VHlwZSIsInRpbGVtYXAiLCJDb25zdW1hYmxlIiwiY29uc3VtYWJsZXMiLCJhZGQiLCJncm91cCIsImVuYWJsZUJvZHkiLCJjcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QiLCJpdGVtIiwiS2V5Iiwia2V5cyIsIkRvb3IiLCJkb29ycyIsInNwcml0ZSIsImJvZHkiLCJtb3ZlcyIsIkdhdGUiLCJnYXRlcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJwbGF5ZXJTdGFydCIsIlBsYXllclN0YXJ0IiwicGxheWVyIiwieCIsInkiLCJoZWlnaHQiLCJhcmNhZGUiLCJlbmFibGUiLCJhbmltYXRpb25zIiwiYW5jaG9yIiwic2V0VG8iLCJzZXRTaXplIiwiY2FtZXJhIiwiZm9sbG93IiwiY3Vyc29ycyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwiY29sbGlkZSIsIm92ZXJsYXAiLCJ2ZWxvY2l0eSIsImRpcmVjdGlvbiIsImxlZnQiLCJpc0Rvd24iLCJyaWdodCIsInVwIiwiZG93biIsInBsYXkiLCJTdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInByb3RvdHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxnQkFBUCxNQUE2QixvQkFBN0I7QUFDQSxTQUNFQyxPQURGLEVBQ1dDLE9BRFgsRUFDb0JDLFNBRHBCLEVBQytCQyxTQUQvQixRQUVPLGdCQUZQOztBQUlBOzs7OztJQUlNQyxlOzs7Ozs7Ozs7OzsrQkFDYztBQUFBLFVBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDaEIsV0FBS0MsVUFBTCxHQUFrQjtBQUNoQkQsd0JBRGdCO0FBRWhCRSxpQkFBU0Y7QUFGTyxPQUFsQjs7QUFLQUcsYUFBT0MsTUFBUCxDQUFjQyxzQkFBZCxDQUFxQyxLQUFLQyxJQUFMLENBQVVDLE1BQS9DO0FBQ0Q7Ozs4QkFDUztBQUFBLHdCQUNxQixLQUFLTixVQUQxQjtBQUFBLFVBQ0FDLE9BREEsZUFDQUEsT0FEQTtBQUFBLFVBQ1NGLE9BRFQsZUFDU0EsT0FEVDs7QUFFUixXQUFLUSxjQUFMLENBQW9CTixPQUFwQixFQUE2QkYsT0FBN0IsRUFBc0MsSUFBdEMsRUFBNENHLE9BQU9NLE9BQVAsQ0FBZUMsVUFBM0Q7QUFDQSxXQUFLQyxJQUFMLENBQVVDLFdBQVYsQ0FBc0IsUUFBdEIsRUFBZ0MseUJBQWhDLEVBQTJELEVBQTNELEVBQStELEVBQS9EO0FBQ0Q7Ozs2QkFDUTtBQUFBOztBQUFBLFVBQ0NWLE9BREQsR0FDYSxLQUFLRCxVQURsQixDQUNDQyxPQUREOztBQUVQLFdBQUtJ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QUssS0FBS1csT0FBTCxDQUFhVyxFQUFiLENBQWdCRixNQUFyQjtBQUNFRix1QkFBYSxJQUFiO0FBQ0EsZUFBS25CLE1BQUwsQ0FBWVYsSUFBWixDQUFpQjRCLFFBQWpCLENBQTBCaEIsQ0FBMUIsR0FBOEIsQ0FBQyxFQUEvQjtBQUNBO0FBQ0YsYUFBSyxLQUFLVSxPQUFMLENBQWFZLElBQWIsQ0FBa0JILE1BQXZCO0FBQ0VGLHVCQUFhLE1BQWI7QUFDQSxlQUFLbkIsTUFBTCxDQUFZVixJQUFaLENBQWlCNEIsUUFBakIsQ0FBMEJoQixDQUExQixHQUE4QixFQUE5QjtBQUNBO0FBUkY7O0FBV0EsVUFBSWlCLFNBQUosRUFBZTtBQUNiLGFBQUtuQixNQUFMLENBQVlNLFVBQVosQ0FBdUJtQixJQUF2QixDQUE0QixNQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUt6QixNQUFMLENBQVlNLFVBQVosQ0FBdUJtQixJQUF2QixDQUE0QixLQUE1QjtBQUNEO0FBQ0Y7Ozs7RUF0STJCbkYsT0FBT29GLEs7O0FBeUlyQ0MsT0FBT0MsTUFBUCxDQUFjMUYsZ0JBQWdCMkYsU0FBOUIsRUFBeUNoRyxnQkFBekM7QUFDQSxlQUFlSyxlQUFmIiwiZmlsZSI6IlRpbGVkTGV2ZWxTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaWxlZEludGVycHJldGVyIGZyb20gJy4vVGlsZWRJbnRlcnByZXRlcic7XG5pbXBvcnQge1xuICBjb2xsZWN0LCBjb25zdW1lLCBrbm9ja0Rvb3IsIGtub2NrR2F0ZVxufSBmcm9tICcuL2ludGVyYWN0aW9ucyc7XG5cbi8qKlxuICogRXh0ZW5kIHRoaXMgaW5zdGVhZCBvZiBQaGFzZXIuU3RhdGUgdG8gaGFuZGxlIGEgVGlsZWQgbGV2ZWxcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNsYXNzIFRpbGVkTGV2ZWxTdGF0ZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gIGluaXQoeyBtYXBQYXRoIH0pIHtcbiAgICB0aGlzLnRpbGVkTGV2ZWwgPSB7XG4gICAgICBtYXBQYXRoLFxuICAgICAgbWFwTmFtZTogbWFwUGF0aFxuICAgIH07XG5cbiAgICBQaGFzZXIuQ2FudmFzLnNldEltYWdlUmVuZGVyaW5nQ3Jpc3AodGhpcy5nYW1lLmNhbnZhcyk7XG4gIH1cbiAgcHJlbG9hZCgpIHtcbiAgICBjb25zdCB7IG1hcE5hbWUsIG1hcFBhdGggfSA9IHRoaXMudGlsZWRMZXZlbDtcbiAgICB0aGlzLnByZWxvYWRUaWxlbWFwKG1hcE5hbWUsIG1hcFBhdGgsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvc3ByaXRlcy9kb2cuZ2lmJywgMjQsIDE2KTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgY29uc3QgeyBtYXBOYW1lIH0gPSB0aGlzLnRpbGVkTGV2ZWw7XG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgLy8gaGF2ZSB0aGUgZ2FtZSBjZW50ZXJlZCBvbiBzY3JlZW5cbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwID0gdGhpcy5jcmVhdGVUaWxlbWFwKG1hcE5hbWUpO1xuXG4gICAgdGhpcy50aWxlZExldmVsLm1hcExheWVycyA9IFtdO1xuICAgIHRoaXMudGlsZWRMZXZlbC5jb2xsaWRlTGF5ZXJzID0gW107XG5cbiAgICB0aGlzLm1hcC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkTGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcihsYXllci5uYW1lKTtcbiAgICAgIGNyZWF0ZWRMYXllci5yZXNpemVXb3JsZCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLm1hcExheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICBpZiAobGF5ZXIucHJvcGVydGllcy5pbXBhc3NhYmxlKSB7XG4gICAgICAgIHRoaXMudGlsZWRMZXZlbC5jb2xsaWRlTGF5ZXJzLnB1c2goY3JlYXRlZExheWVyKTtcbiAgICAgICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQnlFeGNsdXNpb24oW10sIHRydWUsIGNyZWF0ZWRMYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBvYmplY3RzQnlUeXBlID0gdGhpcy5nZXRUaWxlbWFwT2JqZWN0c0J5VHlwZSh0aGlzLnRpbGVtYXApO1xuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuQ29uc3VtYWJsZSkge1xuICAgICAgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgY29uc3VtYWJsZXMgPSBvYmplY3RzQnlUeXBlLkNvbnN1bWFibGU7XG4gICAgICBjb25zdW1hYmxlcy5mb3JFYWNoKGl0ZW0gPT5cbiAgICAgICAgdGhpcy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0c0J5VHlwZS5LZXkpIHtcbiAgICAgIHRoaXMudGlsZWRMZXZlbC5rZXlzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmtleXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBjb25zdCBrZXlzID0gb2JqZWN0c0J5VHlwZS5LZXk7XG4gICAgICBrZXlzLmZvckVhY2goaXRlbSA9PlxuICAgICAgICB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwua2V5cylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuRG9vcikge1xuICAgICAgdGhpcy50aWxlZExldmVsLmRvb3JzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmRvb3JzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgZG9vcnMgPSBvYmplY3RzQnlUeXBlLkRvb3I7XG4gICAgICBkb29ycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBzcHJpdGUgPSB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwuZG9vcnMpO1xuICAgICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuR2F0ZSkge1xuICAgICAgdGhpcy50aWxlZExldmVsLmdhdGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmdhdGVzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgZ2F0ZXMgPSBvYmplY3RzQnlUeXBlLkdhdGU7XG4gICAgICBnYXRlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBzcHJpdGUgPSB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwuZ2F0ZXMpO1xuICAgICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICAvLyBhZGQgcGxheWVyXG4gICAgY29uc3QgcGxheWVyU3RhcnQgPSBvYmplY3RzQnlUeXBlLlBsYXllclN0YXJ0WzBdO1xuICAgIHRoaXMucGxheWVyID0gdGhpcy5hZGQuc3ByaXRlKHBsYXllclN0YXJ0LngsIHBsYXllclN0YXJ0LnkgLSBwbGF5ZXJTdGFydC5oZWlnaHQsICdwbGF5ZXInKTtcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnLCBbIDAsIDIgXSwgOCwgdHJ1ZSk7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3NpdCcsIFsgMywgNCwgMywgNCwgMywgNCwgMywgNCwgMywgNCwgNSwgNiwgNSwgNiwgNSwgNiwgNSwgNiwgNSwgNiBdLCA4LCB0cnVlKTtcbiAgICB0aGlzLnBsYXllci5zY2FsZS54ID0gLTE7XG4gICAgdGhpcy5wbGF5ZXIuYW5jaG9yLnNldFRvKDAuNSwgMSk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRTaXplKDEwLCA4LCAzLCA4KTtcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuICB9XG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnRpbGVkTGV2ZWwuY29sbGlkZUxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCBsYXllcik7XG4gICAgfSk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMudGlsZWRMZXZlbC5jb25zdW1hYmxlcywgY29uc3VtZSwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMudGlsZWRMZXZlbC5rZXlzLCBjb2xsZWN0LCBudWxsLCB0aGlzKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy50aWxlZExldmVsLmRvb3JzLCBrbm9ja0Rvb3IsIG51bGwsIHRoaXMpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnRpbGVkTGV2ZWwuZ2F0ZXMsIGtub2NrR2F0ZSwgbnVsbCwgdGhpcyk7XG4gICAgLy8gIFJlc2V0IHRoZSB0aGlzLnBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMDtcblxuICAgIGxldCBkaXJlY3Rpb24gPSAnJztcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bjpcbiAgICAgIGRpcmVjdGlvbiArPSAnbGVmdCc7XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtNTA7XG4gICAgICB0aGlzLnBsYXllci5zY2FsZS54ID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bjpcbiAgICAgIGRpcmVjdGlvbiArPSAncmlnaHQnO1xuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gNTA7XG4gICAgICB0aGlzLnBsYXllci5zY2FsZS54ID0gLTE7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy51cC5pc0Rvd246XG4gICAgICBkaXJlY3Rpb24gKz0gJ3VwJztcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC01MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxuICAgICAgZGlyZWN0aW9uICs9ICdkb3duJztcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDUwO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCd3YWxrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc2l0Jyk7XG4gICAgfVxuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVGlsZWRMZXZlbFN0YXRlLnByb3RvdHlwZSwgVGlsZWRJbnRlcnByZXRlcik7XG5leHBvcnQgZGVmYXVsdCBUaWxlZExldmVsU3RhdGU7XG4iXX0=