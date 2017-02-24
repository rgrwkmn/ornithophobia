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
      this.load.spritesheet('player', '/assets/sprites/player.png', 16, 16);
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
      this.player.animations.add('walk', [1, 2], 10, true);
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
          this.player.body.velocity.x = -75;
          this.player.scale.x = -1;
          break;
        case this.cursors.right.isDown:
          direction += 'right';
          this.player.body.velocity.x = 75;
          this.player.scale.x = 1;
          break;
      }

      switch (true) {
        case this.cursors.up.isDown:
          direction += 'up';
          this.player.body.velocity.y = -75;
          break;
        case this.cursors.down.isDown:
          direction += 'down';
          this.player.body.velocity.y = 75;
          break;
      }

      if (direction) {
        this.player.animations.play('walk');
      } else {
        this.player.frame = 0;
      }
    }
  }]);

  return TiledLevelState;
}(Phaser.State);

Object.assign(TiledLevelState.prototype, TiledInterpreter);
export default TiledLevelState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2VuZ2luZS9UaWxlZExldmVsU3RhdGUuanMiXSwibmFtZXMiOlsiVGlsZWRJbnRlcnByZXRlciIsImNvbGxlY3QiLCJjb25zdW1lIiwia25vY2tEb29yIiwia25vY2tHYXRlIiwiVGlsZWRMZXZlbFN0YXRlIiwibWFwUGF0aCIsInRpbGVkTGV2ZWwiLCJtYXBOYW1lIiwiUGhhc2VyIiwiQ2FudmFzIiwic2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCIsImdhbWUiLCJjYW52YXMiLCJwcmVsb2FkVGlsZW1hcCIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwibG9hZCIsInNwcml0ZXNoZWV0Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzY2FsZSIsInNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlNIT1dfQUxMIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsIm1hcCIsImNyZWF0ZVRpbGVtYXAiLCJtYXBMYXllcnMiLCJjb2xsaWRlTGF5ZXJzIiwibGF5ZXJzIiwiZm9yRWFjaCIsImNyZWF0ZWRMYXllciIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJuYW1lIiwicmVzaXplV29ybGQiLCJwdXNoIiwicHJvcGVydGllcyIsImltcGFzc2FibGUiLCJzZXRDb2xsaXNpb25CeUV4Y2x1c2lvbiIsIm9iamVjdHNCeVR5cGUiLCJnZXRUaWxlbWFwT2JqZWN0c0J5VHlwZSIsInRpbGVtYXAiLCJDb25zdW1hYmxlIiwiY29uc3VtYWJsZXMiLCJhZGQiLCJncm91cCIsImVuYWJsZUJvZHkiLCJjcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QiLCJpdGVtIiwiS2V5Iiwia2V5cyIsIkRvb3IiLCJkb29ycyIsInNwcml0ZSIsImJvZHkiLCJtb3ZlcyIsIkdhdGUiLCJnYXRlcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJwbGF5ZXJTdGFydCIsIlBsYXllclN0YXJ0IiwicGxheWVyIiwieCIsInkiLCJoZWlnaHQiLCJhcmNhZGUiLCJlbmFibGUiLCJhbmltYXRpb25zIiwiYW5jaG9yIiwic2V0VG8iLCJzZXRTaXplIiwiY2FtZXJhIiwiZm9sbG93IiwiY3Vyc29ycyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwiY29sbGlkZSIsIm92ZXJsYXAiLCJ2ZWxvY2l0eSIsImRpcmVjdGlvbiIsImxlZnQiLCJpc0Rvd24iLCJyaWdodCIsInVwIiwiZG93biIsInBsYXkiLCJmcmFtZSIsIlN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvdG90eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLGdCQUFQLE1BQTZCLG9CQUE3QjtBQUNBLFNBQ0VDLE9BREYsRUFDV0MsT0FEWCxFQUNvQkMsU0FEcEIsRUFDK0JDLFNBRC9CLFFBRU8sZ0JBRlA7O0FBSUE7Ozs7O0lBSU1DLGU7Ozs7Ozs7Ozs7OytCQUNjO0FBQUEsVUFBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUNoQixXQUFLQyxVQUFMLEdBQWtCO0FBQ2hCRCx3QkFEZ0I7QUFFaEJFLGlCQUFTRjtBQUZPLE9BQWxCOztBQUtBRyxhQUFPQyxNQUFQLENBQWNDLHNCQUFkLENBQXFDLEtBQUtDLElBQUwsQ0FBVUMsTUFBL0M7QUFDRDs7OzhCQUNTO0FBQUEsd0JBQ3FCLEtBQUtOLFVBRDFCO0FBQUEsVUFDQUMsT0FEQSxlQUNBQSxPQURBO0FBQUEsVUFDU0YsT0FEVCxlQUNTQSxPQURUOztBQUVSLFdBQUtRLGNBQUwsQ0FBb0JOLE9BQXBCLEVBQTZCRixPQUE3QixFQUFzQyxJQUF0QyxFQUE0Q0csT0FBT00sT0FBUCxDQUFlQyxVQUEzRDtBQUNBLFdBQUtDLElBQUwsQ0FBVUMsV0FBVixDQUFzQixRQUF0QixFQUFnQyw0QkFBaEMsRUFBOEQsRUFBOUQsRUFBa0UsRUFBbEU7QUFDRDs7OzZCQUNRO0FBQUE7O0FBQUEsVUFDQ1YsT0FERCxHQUNhLEtBQUtELFVBRGxCLENBQ0NDLE9BREQ7O0FB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QUFLekIsTUFBTCxDQUFZMEIsS0FBWixHQUFvQixDQUFwQjtBQUNEO0FBQ0Y7Ozs7RUFwSTJCcEYsT0FBT3FGLEs7O0FBdUlyQ0MsT0FBT0MsTUFBUCxDQUFjM0YsZ0JBQWdCNEYsU0FBOUIsRUFBeUNqRyxnQkFBekM7QUFDQSxlQUFlSyxlQUFmIiwiZmlsZSI6IlRpbGVkTGV2ZWxTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaWxlZEludGVycHJldGVyIGZyb20gJy4vVGlsZWRJbnRlcnByZXRlcic7XG5pbXBvcnQge1xuICBjb2xsZWN0LCBjb25zdW1lLCBrbm9ja0Rvb3IsIGtub2NrR2F0ZVxufSBmcm9tICcuL2ludGVyYWN0aW9ucyc7XG5cbi8qKlxuICogRXh0ZW5kIHRoaXMgaW5zdGVhZCBvZiBQaGFzZXIuU3RhdGUgdG8gaGFuZGxlIGEgVGlsZWQgbGV2ZWxcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNsYXNzIFRpbGVkTGV2ZWxTdGF0ZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gIGluaXQoeyBtYXBQYXRoIH0pIHtcbiAgICB0aGlzLnRpbGVkTGV2ZWwgPSB7XG4gICAgICBtYXBQYXRoLFxuICAgICAgbWFwTmFtZTogbWFwUGF0aFxuICAgIH07XG5cbiAgICBQaGFzZXIuQ2FudmFzLnNldEltYWdlUmVuZGVyaW5nQ3Jpc3AodGhpcy5nYW1lLmNhbnZhcyk7XG4gIH1cbiAgcHJlbG9hZCgpIHtcbiAgICBjb25zdCB7IG1hcE5hbWUsIG1hcFBhdGggfSA9IHRoaXMudGlsZWRMZXZlbDtcbiAgICB0aGlzLnByZWxvYWRUaWxlbWFwKG1hcE5hbWUsIG1hcFBhdGgsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvc3ByaXRlcy9wbGF5ZXIucG5nJywgMTYsIDE2KTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgY29uc3QgeyBtYXBOYW1lIH0gPSB0aGlzLnRpbGVkTGV2ZWw7XG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgLy8gaGF2ZSB0aGUgZ2FtZSBjZW50ZXJlZCBvbiBzY3JlZW5cbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwID0gdGhpcy5jcmVhdGVUaWxlbWFwKG1hcE5hbWUpO1xuXG4gICAgdGhpcy50aWxlZExldmVsLm1hcExheWVycyA9IFtdO1xuICAgIHRoaXMudGlsZWRMZXZlbC5jb2xsaWRlTGF5ZXJzID0gW107XG5cbiAgICB0aGlzLm1hcC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkTGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcihsYXllci5uYW1lKTtcbiAgICAgIGNyZWF0ZWRMYXllci5yZXNpemVXb3JsZCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLm1hcExheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICBpZiAobGF5ZXIucHJvcGVydGllcy5pbXBhc3NhYmxlKSB7XG4gICAgICAgIHRoaXMudGlsZWRMZXZlbC5jb2xsaWRlTGF5ZXJzLnB1c2goY3JlYXRlZExheWVyKTtcbiAgICAgICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQnlFeGNsdXNpb24oW10sIHRydWUsIGNyZWF0ZWRMYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBvYmplY3RzQnlUeXBlID0gdGhpcy5nZXRUaWxlbWFwT2JqZWN0c0J5VHlwZSh0aGlzLnRpbGVtYXApO1xuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuQ29uc3VtYWJsZSkge1xuICAgICAgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgY29uc3VtYWJsZXMgPSBvYmplY3RzQnlUeXBlLkNvbnN1bWFibGU7XG4gICAgICBjb25zdW1hYmxlcy5mb3JFYWNoKGl0ZW0gPT5cbiAgICAgICAgdGhpcy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy50aWxlZExldmVsLmNvbnN1bWFibGVzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0c0J5VHlwZS5LZXkpIHtcbiAgICAgIHRoaXMudGlsZWRMZXZlbC5rZXlzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmtleXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBjb25zdCBrZXlzID0gb2JqZWN0c0J5VHlwZS5LZXk7XG4gICAgICBrZXlzLmZvckVhY2goaXRlbSA9PlxuICAgICAgICB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwua2V5cylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuRG9vcikge1xuICAgICAgdGhpcy50aWxlZExldmVsLmRvb3JzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmRvb3JzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgZG9vcnMgPSBvYmplY3RzQnlUeXBlLkRvb3I7XG4gICAgICBkb29ycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBzcHJpdGUgPSB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwuZG9vcnMpO1xuICAgICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuR2F0ZSkge1xuICAgICAgdGhpcy50aWxlZExldmVsLmdhdGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy50aWxlZExldmVsLmdhdGVzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgY29uc3QgZ2F0ZXMgPSBvYmplY3RzQnlUeXBlLkdhdGU7XG4gICAgICBnYXRlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBzcHJpdGUgPSB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLnRpbGVkTGV2ZWwuZ2F0ZXMpO1xuICAgICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICAvLyBhZGQgcGxheWVyXG4gICAgY29uc3QgcGxheWVyU3RhcnQgPSBvYmplY3RzQnlUeXBlLlBsYXllclN0YXJ0WzBdO1xuICAgIHRoaXMucGxheWVyID0gdGhpcy5hZGQuc3ByaXRlKHBsYXllclN0YXJ0LngsIHBsYXllclN0YXJ0LnkgLSBwbGF5ZXJTdGFydC5oZWlnaHQsICdwbGF5ZXInKTtcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnLCBbIDEsIDIgXSwgMTAsIHRydWUpO1xuICAgIHRoaXMucGxheWVyLmFuY2hvci5zZXRUbygwLjUsIDEpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuc2V0U2l6ZSgxMCwgOCwgMywgOCk7XG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy50aWxlZExldmVsLmNvbGxpZGVMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgbGF5ZXIpO1xuICAgIH0pO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLnRpbGVkTGV2ZWwuY29uc3VtYWJsZXMsIGNvbnN1bWUsIG51bGwsIHRoaXMpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLnRpbGVkTGV2ZWwua2V5cywgY29sbGVjdCwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMudGlsZWRMZXZlbC5kb29ycywga25vY2tEb29yLCBudWxsLCB0aGlzKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy50aWxlZExldmVsLmdhdGVzLCBrbm9ja0dhdGUsIG51bGwsIHRoaXMpO1xuICAgIC8vICBSZXNldCB0aGUgdGhpcy5wbGF5ZXJzIHZlbG9jaXR5IChtb3ZlbWVudClcbiAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDA7XG5cbiAgICBsZXQgZGlyZWN0aW9uID0gJyc7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd246XG4gICAgICBkaXJlY3Rpb24gKz0gJ2xlZnQnO1xuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gLTc1O1xuICAgICAgdGhpcy5wbGF5ZXIuc2NhbGUueCA9IC0xO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgZGlyZWN0aW9uICs9ICdyaWdodCc7XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSA3NTtcbiAgICAgIHRoaXMucGxheWVyLnNjYWxlLnggPSAxO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMudXAuaXNEb3duOlxuICAgICAgZGlyZWN0aW9uICs9ICd1cCc7XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAtNzU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5kb3duLmlzRG93bjpcbiAgICAgIGRpcmVjdGlvbiArPSAnZG93bic7XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSA3NTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnd2FsaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllci5mcmFtZSA9IDA7XG4gICAgfVxuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVGlsZWRMZXZlbFN0YXRlLnByb3RvdHlwZSwgVGlsZWRJbnRlcnByZXRlcik7XG5leHBvcnQgZGVmYXVsdCBUaWxlZExldmVsU3RhdGU7XG4iXX0=