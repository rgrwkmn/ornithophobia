var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TiledInterpreter from '../engine/TiledInterpreter';

function collect(entity, item) {
  console.log(entity.key, 'collects', item.gameData.name);
  if (!entity.inventory) {
    entity.inventory = [];
  }
  entity.inventory.push(item.gameData);
  item.destroy();
}

function consume(entity, item) {
  console.log(entity.key, 'consumes', item.gameData.name);
  item.destroy();
}

function knock(entity, door) {
  // console.log('knock', entity, door);
  if (!door.gameData || !door.gameData.key) {
    console.warn('door ' + door.gameData.name + ' doesn\'t have no damn KEY', door);
    return;
  }

  if (entity.inventory && entity.inventory.some(function (item) {
    return item.type === 'key' && item.id === door.gameData.key;
  })) {
    door.destroy();
  } else {
    console.log('need some key for this door idiot');
  }
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
      this.preloadTilemap('level1', 'assets/maps/example.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('player', 'assets/dude.png', 32, 48);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      // loading screen will have a white background
      this.game.stage.backgroundColor = '#000';

      // scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.map = this.createTilemap('level1');

      this.mapLayers = [];
      this.collideLayers = [];

      this.map.layers.forEach(function (layer) {
        var createdLayer = _this2.map.createLayer(layer.name);
        createdLayer.resizeWorld();
        _this2.mapLayers.push(createdLayer);
        if (layer.properties.impassable) {
          _this2.collideLayers.push(createdLayer);
          _this2.map.setCollisionByExclusion([], true, createdLayer);
        }
      });

      var objectsByType = this.arrangeObjectsByType(this.getObjectsFromTilemap(this.tilemap));
      this.consumables = this.game.add.group();
      this.consumables.enableBody = true;
      var consumables = objectsByType.consumable;
      consumables.forEach(function (item) {
        return _this2.createSpriteFromTiledObject(item, _this2.consumables);
      });

      this.keys = this.game.add.group();
      this.keys.enableBody = true;
      var keys = objectsByType.key;
      keys.forEach(function (item) {
        return _this2.createSpriteFromTiledObject(item, _this2.keys);
      });

      this.doors = this.game.add.group();
      this.doors.enableBody = true;
      var doors = objectsByType.door;
      doors.forEach(function (item) {
        var sprite = _this2.createSpriteFromTiledObject(item, _this2.doors);
        sprite.body.moves = false;
      });

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = objectsByType.playerStart[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y - playerStart.height, 'player');
      this.player.scale.setTo(0.5, 0.5);
      this.physics.arcade.enable(this.player);
      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);
      this.game.camera.follow(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.collideLayers.forEach(function (layer) {
        _this3.game.physics.arcade.collide(_this3.player, layer);
      });
      this.game.physics.arcade.overlap(this.player, this.consumables, consume, null, this);
      this.game.physics.arcade.overlap(this.player, this.keys, collect, null, this);
      this.game.physics.arcade.collide(this.player, this.doors, knock, null, this);
      //  Reset the this.players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      switch (true) {
        case this.cursors.up.isDown:
          this.player.body.velocity.y = -150;
          break;
        case this.cursors.down.isDown:
          this.player.body.velocity.y = 150;
          break;
      }
      switch (true) {
        case this.cursors.left.isDown:
          this.player.body.velocity.x = -150;
          this.player.animations.play('left');
          break;
        case this.cursors.right.isDown:
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

export default Object.assign(State.prototype, TiledInterpreter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsiVGlsZWRJbnRlcnByZXRlciIsImNvbGxlY3QiLCJlbnRpdHkiLCJpdGVtIiwiY29uc29sZSIsImxvZyIsImtleSIsImdhbWVEYXRhIiwibmFtZSIsImludmVudG9yeSIsInB1c2giLCJkZXN0cm95IiwiY29uc3VtZSIsImtub2NrIiwiZG9vciIsIndhcm4iLCJzb21lIiwidHlwZSIsImlkIiwiU3RhdGUiLCJwcmVsb2FkVGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwibG9hZCIsInNwcml0ZXNoZWV0IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic2NhbGUiLCJzY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJTSE9XX0FMTCIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJtYXAiLCJjcmVhdGVUaWxlbWFwIiwibWFwTGF5ZXJzIiwiY29sbGlkZUxheWVycyIsImxheWVycyIsImZvckVhY2giLCJjcmVhdGVkTGF5ZXIiLCJjcmVhdGVMYXllciIsImxheWVyIiwicmVzaXplV29ybGQiLCJwcm9wZXJ0aWVzIiwiaW1wYXNzYWJsZSIsInNldENvbGxpc2lvbkJ5RXhjbHVzaW9uIiwib2JqZWN0c0J5VHlwZSIsImFycmFuZ2VPYmplY3RzQnlUeXBlIiwiZ2V0T2JqZWN0c0Zyb21UaWxlbWFwIiwidGlsZW1hcCIsImNvbnN1bWFibGVzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwiY29uc3VtYWJsZSIsImNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdCIsImtleXMiLCJkb29ycyIsInNwcml0ZSIsImJvZHkiLCJtb3ZlcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJwbGF5ZXJTdGFydCIsInBsYXllciIsIngiLCJ5IiwiaGVpZ2h0Iiwic2V0VG8iLCJhcmNhZGUiLCJlbmFibGUiLCJhbmltYXRpb25zIiwiY2FtZXJhIiwiZm9sbG93IiwiY3Vyc29ycyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwiY29sbGlkZSIsIm92ZXJsYXAiLCJ2ZWxvY2l0eSIsInVwIiwiaXNEb3duIiwiZG93biIsImxlZnQiLCJwbGF5IiwicmlnaHQiLCJmcmFtZSIsIk9iamVjdCIsImFzc2lnbiIsInByb3RvdHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxnQkFBUCxNQUE2Qiw0QkFBN0I7O0FBRUEsU0FBU0MsT0FBVCxDQUFpQkMsTUFBakIsRUFBeUJDLElBQXpCLEVBQStCO0FBQzdCQyxVQUFRQyxHQUFSLENBQVlILE9BQU9JLEdBQW5CLEVBQXdCLFVBQXhCLEVBQW9DSCxLQUFLSSxRQUFMLENBQWNDLElBQWxEO0FBQ0EsTUFBSSxDQUFDTixPQUFPTyxTQUFaLEVBQXVCO0FBQ3JCUCxXQUFPTyxTQUFQLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRFAsU0FBT08sU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0JQLEtBQUtJLFFBQTNCO0FBQ0FKLE9BQUtRLE9BQUw7QUFDRDs7QUFFRCxTQUFTQyxPQUFULENBQWlCVixNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0JDLFVBQVFDLEdBQVIsQ0FBWUgsT0FBT0ksR0FBbkIsRUFBd0IsVUFBeEIsRUFBb0NILEtBQUtJLFFBQUwsQ0FBY0MsSUFBbEQ7QUFDQUwsT0FBS1EsT0FBTDtBQUNEOztBQUVELFNBQVNFLEtBQVQsQ0FBZVgsTUFBZixFQUF1QlksSUFBdkIsRUFBNkI7QUFDM0I7QUFDQSxNQUFJLENBQUNBLEtBQUtQLFFBQU4sSUFBa0IsQ0FBQ08sS0FBS1AsUUFBTCxDQUFjRCxHQUFyQyxFQUEwQztBQUN4Q0YsWUFBUVcsSUFBUixXQUFxQkQsS0FBS1AsUUFBTCxDQUFjQyxJQUFuQyxpQ0FBb0VNLElBQXBFO0FBQ0E7QUFDRDs7QUFFRCxNQUFJWixPQUFPTyxTQUFQLElBQW9C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QUtRLE9BQUwsQ0FBYVUsSUFBYixDQUFrQkYsTUFBdkI7QUFDRSxlQUFLbEIsTUFBTCxDQUFZUCxJQUFaLENBQWlCdUIsUUFBakIsQ0FBMEJmLENBQTFCLEdBQThCLENBQUMsR0FBL0I7QUFDQSxlQUFLRCxNQUFMLENBQVlPLFVBQVosQ0FBdUJjLElBQXZCLENBQTRCLE1BQTVCO0FBQ0E7QUFDRixhQUFLLEtBQUtYLE9BQUwsQ0FBYVksS0FBYixDQUFtQkosTUFBeEI7QUFDRSxlQUFLbEIsTUFBTCxDQUFZUCxJQUFaLENBQWlCdUIsUUFBakIsQ0FBMEJmLENBQTFCLEdBQThCLEdBQTlCO0FBQ0EsZUFBS0QsTUFBTCxDQUFZTyxVQUFaLENBQXVCYyxJQUF2QixDQUE0QixPQUE1QjtBQUNBO0FBQ0Y7QUFDRSxlQUFLckIsTUFBTCxDQUFZdUIsS0FBWixHQUFvQixDQUFwQjtBQVZGO0FBWUQ7Ozs7RUE5RmlCdEUsT0FBT0YsSzs7QUFpRzNCLGVBQWV5RSxPQUFPQyxNQUFQLENBQWMxRSxNQUFNMkUsU0FBcEIsRUFBK0I5RixnQkFBL0IsQ0FBZiIsImZpbGUiOiJzdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaWxlZEludGVycHJldGVyIGZyb20gJy4uL2VuZ2luZS9UaWxlZEludGVycHJldGVyJztcblxuZnVuY3Rpb24gY29sbGVjdChlbnRpdHksIGl0ZW0pIHtcbiAgY29uc29sZS5sb2coZW50aXR5LmtleSwgJ2NvbGxlY3RzJywgaXRlbS5nYW1lRGF0YS5uYW1lKTtcbiAgaWYgKCFlbnRpdHkuaW52ZW50b3J5KSB7XG4gICAgZW50aXR5LmludmVudG9yeSA9IFtdO1xuICB9XG4gIGVudGl0eS5pbnZlbnRvcnkucHVzaChpdGVtLmdhbWVEYXRhKTtcbiAgaXRlbS5kZXN0cm95KCk7XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWUoZW50aXR5LCBpdGVtKSB7XG4gIGNvbnNvbGUubG9nKGVudGl0eS5rZXksICdjb25zdW1lcycsIGl0ZW0uZ2FtZURhdGEubmFtZSk7XG4gIGl0ZW0uZGVzdHJveSgpO1xufVxuXG5mdW5jdGlvbiBrbm9jayhlbnRpdHksIGRvb3IpIHtcbiAgLy8gY29uc29sZS5sb2coJ2tub2NrJywgZW50aXR5LCBkb29yKTtcbiAgaWYgKCFkb29yLmdhbWVEYXRhIHx8ICFkb29yLmdhbWVEYXRhLmtleSkge1xuICAgIGNvbnNvbGUud2FybihgZG9vciAke2Rvb3IuZ2FtZURhdGEubmFtZX0gZG9lc24ndCBoYXZlIG5vIGRhbW4gS0VZYCwgZG9vcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVudGl0eS5pbnZlbnRvcnkgJiYgZW50aXR5LmludmVudG9yeS5zb21lKFxuICAgIGl0ZW0gPT4gaXRlbS50eXBlID09PSAna2V5JyAmJiBpdGVtLmlkID09PSBkb29yLmdhbWVEYXRhLmtleVxuICApKSB7XG4gICAgZG9vci5kZXN0cm95KCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ25lZWQgc29tZSBrZXkgZm9yIHRoaXMgZG9vciBpZGlvdCcpO1xuICB9XG59XG5cbmNsYXNzIFN0YXRlIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcbiAgcHJlbG9hZCgpIHtcbiAgICB0aGlzLnByZWxvYWRUaWxlbWFwKCdsZXZlbDEnLCAnYXNzZXRzL21hcHMvZXhhbXBsZS5qc29uJywgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL2R1ZGUucG5nJywgMzIsIDQ4KTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgLy8gbG9hZGluZyBzY3JlZW4gd2lsbCBoYXZlIGEgd2hpdGUgYmFja2dyb3VuZFxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cbiAgICAvLyBzY2FsaW5nIG9wdGlvbnNcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG5cbiAgICAvLyBoYXZlIHRoZSBnYW1lIGNlbnRlcmVkIGhvcml6b250YWxseVxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuXG4gICAgdGhpcy5tYXAgPSB0aGlzLmNyZWF0ZVRpbGVtYXAoJ2xldmVsMScpO1xuXG4gICAgdGhpcy5tYXBMYXllcnMgPSBbXTtcbiAgICB0aGlzLmNvbGxpZGVMYXllcnMgPSBbXTtcblxuICAgIHRoaXMubWFwLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRMYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKGxheWVyLm5hbWUpO1xuICAgICAgY3JlYXRlZExheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgICB0aGlzLm1hcExheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICBpZiAobGF5ZXIucHJvcGVydGllcy5pbXBhc3NhYmxlKSB7XG4gICAgICAgIHRoaXMuY29sbGlkZUxheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJ5RXhjbHVzaW9uKFtdLCB0cnVlLCBjcmVhdGVkTGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb2JqZWN0c0J5VHlwZSA9IHRoaXMuYXJyYW5nZU9iamVjdHNCeVR5cGUodGhpcy5nZXRPYmplY3RzRnJvbVRpbGVtYXAodGhpcy50aWxlbWFwKSk7XG4gICAgdGhpcy5jb25zdW1hYmxlcyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmNvbnN1bWFibGVzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIGNvbnN0IGNvbnN1bWFibGVzID0gb2JqZWN0c0J5VHlwZS5jb25zdW1hYmxlO1xuICAgIGNvbnN1bWFibGVzLmZvckVhY2goaXRlbSA9PiB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmNvbnN1bWFibGVzKSk7XG5cbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5rZXlzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIGNvbnN0IGtleXMgPSBvYmplY3RzQnlUeXBlLmtleTtcbiAgICBrZXlzLmZvckVhY2goaXRlbSA9PiB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmtleXMpKTtcblxuICAgIHRoaXMuZG9vcnMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5kb29ycy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBjb25zdCBkb29ycyA9IG9iamVjdHNCeVR5cGUuZG9vcjtcbiAgICBkb29ycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy5kb29ycyk7XG4gICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICAvLyBhZGQgcGxheWVyXG4gICAgY29uc3QgcGxheWVyU3RhcnQgPSBvYmplY3RzQnlUeXBlLnBsYXllclN0YXJ0WzBdO1xuICAgIHRoaXMucGxheWVyID0gdGhpcy5hZGQuc3ByaXRlKHBsYXllclN0YXJ0LngsIHBsYXllclN0YXJ0LnkgLSBwbGF5ZXJTdGFydC5oZWlnaHQsICdwbGF5ZXInKTtcbiAgICB0aGlzLnBsYXllci5zY2FsZS5zZXRUbygwLjUsIDAuNSk7XG4gICAgdGhpcy5waHlzaWNzLmFyY2FkZS5lbmFibGUodGhpcy5wbGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdsZWZ0JywgWyAwLCAxLCAyLCAzIF0sIDEwLCB0cnVlKTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgncmlnaHQnLCBbIDUsIDYsIDcsIDggXSwgMTAsIHRydWUpO1xuICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIHRoaXMuY3Vyc29ycyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG4gIH1cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuY29sbGlkZUxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCBsYXllcik7XG4gICAgfSk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuY29uc3VtYWJsZXMsIGNvbnN1bWUsIG51bGwsIHRoaXMpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmtleXMsIGNvbGxlY3QsIG51bGwsIHRoaXMpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmRvb3JzLCBrbm9jaywgbnVsbCwgdGhpcyk7XG4gICAgLy8gIFJlc2V0IHRoZSB0aGlzLnBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMDtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLnVwLmlzRG93bjpcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC0xNTA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5kb3duLmlzRG93bjpcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDE1MDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bjpcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2xlZnQnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bjpcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDE1MDtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncmlnaHQnKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLnBsYXllci5mcmFtZSA9IDQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oU3RhdGUucHJvdG90eXBlLCBUaWxlZEludGVycHJldGVyKTtcbiJdfQ==