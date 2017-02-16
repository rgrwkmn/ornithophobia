var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TiledInterpreter from '../engine/TiledInterpreter';

function collect(entity, item) {
  console.log(entity.key, 'collects', item.gameData.displayName);
  if (!entity.inventory) {
    entity.inventory = [];
  }
  entity.inventory.push(item.gameData);
  item.destroy();
}

function consume(entity, item) {
  console.log(entity.key, 'consumes', item.gameData.displayName);
  item.destroy();
}

function knockDoor(entity, door) {
  if (!door.gameData || !door.gameData.key) {
    console.warn('door ' + door.gameData.name + ' doesn\'t have no damn KEY', door);
    return;
  }

  if (entity.inventory) {
    var item = entity.inventory.find(function (item) {
      return item.type === 'Key' && item.id === door.gameData.key;
    });
    if (item) {
      door.destroy();
      console.log('you used the ' + item.displayName + ' key on the door and it opened');
      return;
    }
  }
  console.log('need some key for this door idiot');
}

function gateCanOpen(gate) {
  return gate.gameData.openDirection === 'north' && gate.body.touching.up || gate.gameData.openDirection === 'south' && gate.body.touching.down || gate.gameData.openDirection === 'west' && gate.body.touching.left || gate.gameData.openDirection === 'east' && gate.body.touching.right;
}

function knockGate(entity, gate) {
  if (!gate.gameData || !gate.gameData.openDirection) {
    console.warn('gate ' + gate.gameData.name + ' ain\'t got no openDirection', gate);
    return;
  }
  if (gateCanOpen(gate)) {
    gate.destroy();
    console.log('the gate has a handle on this side, you opened it');
  } else {
    console.log('the gate does not open from this side');
  }
}

var State = function (_Phaser$State) {
  _inherits(State, _Phaser$State);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.preloadTilemap('level1', 'assets/maps/larger.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('player', 'assets/sprites/player.png', 16, 16);
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

      if (objectsByType.Consumable) {
        this.consumables = this.game.add.group();
        this.consumables.enableBody = true;
        var consumables = objectsByType.Consumable;
        consumables.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.consumables);
        });
      }

      if (objectsByType.Key) {
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        var keys = objectsByType.Key;
        keys.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.keys);
        });
      }

      if (objectsByType.Door) {
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        var doors = objectsByType.Door;
        doors.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.doors);
          sprite.body.moves = false;
        });
      }

      if (objectsByType.Gate) {
        this.gates = this.game.add.group();
        this.gates.enableBody = true;
        var gates = objectsByType.Gate;
        gates.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.gates);
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

      console.log('you awaken in a rocky forest');
      console.log('there are pixels around you that should probably be transparent');
      console.log('you somehow know that in order to leave this place');
      console.log('you will have to unlock some doors...');
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
      this.game.physics.arcade.collide(this.player, this.doors, knockDoor, null, this);
      this.game.physics.arcade.collide(this.player, this.gates, knockGate, null, this);
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

  return State;
}(Phaser.State);

export default Object.assign(State.prototype, TiledInterpreter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsiVGlsZWRJbnRlcnByZXRlciIsImNvbGxlY3QiLCJlbnRpdHkiLCJpdGVtIiwiY29uc29sZSIsImxvZyIsImtleSIsImdhbWVEYXRhIiwiZGlzcGxheU5hbWUiLCJpbnZlbnRvcnkiLCJwdXNoIiwiZGVzdHJveSIsImNvbnN1bWUiLCJrbm9ja0Rvb3IiLCJkb29yIiwid2FybiIsIm5hbWUiLCJmaW5kIiwidHlwZSIsImlkIiwiZ2F0ZUNhbk9wZW4iLCJnYXRlIiwib3BlbkRpcmVjdGlvbiIsImJvZHkiLCJ0b3VjaGluZyIsInVwIiwiZG93biIsImxlZnQiLCJyaWdodCIsImtub2NrR2F0ZSIsIlN0YXRlIiwiUGhhc2VyIiwiQ2FudmFzIiwic2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCIsImdhbWUiLCJjYW52YXMiLCJwcmVsb2FkVGlsZW1hcCIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwibG9hZCIsInNwcml0ZXNoZWV0Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzY2FsZSIsInNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlNIT1dfQUxMIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsIm1hcCIsImNyZWF0ZVRpbGVtYXAiLCJtYXBMYXllcnMiLCJjb2xsaWRlTGF5ZXJzIiwibGF5ZXJzIiwiZm9yRWFjaCIsImNyZWF0ZWRMYXllciIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJyZXNpemVXb3JsZCIsInByb3BlcnRpZXMiLCJpbXBhc3NhYmxlIiwic2V0Q29sbGlzaW9uQnlFeGNsdXNpb24iLCJvYmplY3RzQnlUeXBlIiwiYXJyYW5nZU9iamVjdHNCeVR5cGUiLCJnZXRPYmplY3RzRnJvbVRpbGVtYXAiLCJ0aWxlbWFwIiwiQ29uc3VtYWJsZSIsImNvbnN1bWFibGVzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwiY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0IiwiS2V5Iiwia2V5cyIsIkRvb3IiLCJkb29ycyIsInNwcml0ZSIsIm1vdmVzIiwiR2F0ZSIsImdhdGVzIiwicGh5c2ljcyIsInN0YXJ0U3lzdGVtIiwiUGh5c2ljcyIsIkFSQ0FERSIsInBsYXllclN0YXJ0IiwiUGxheWVyU3RhcnQiLCJwbGF5ZXIiLCJ4IiwieSIsImhlaWdodCIsImFyY2FkZSIsImVuYWJsZSIsImFuaW1hdGlvbnMiLCJhbmNob3IiLCJzZXRUbyIsInNldFNpemUiLCJjYW1lcmEiLCJmb2xsb3ciLCJjdXJzb3JzIiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJjb2xsaWRlIiwib3ZlcmxhcCIsInZlbG9jaXR5IiwiZGlyZWN0aW9uIiwiaXNEb3duIiwicGxheSIsImZyYW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvdG90eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLGdCQUFQLE1BQTZCLDRCQUE3Qjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0JDLFVBQVFDLEdBQVIsQ0FBWUgsT0FBT0ksR0FBbkIsRUFBd0IsVUFBeEIsRUFBb0NILEtBQUtJLFFBQUwsQ0FBY0MsV0FBbEQ7QUFDQSxNQUFJLENBQUNOLE9BQU9PLFNBQVosRUFBdUI7QUFDckJQLFdBQU9PLFNBQVAsR0FBbUIsRUFBbkI7QUFDRDtBQUNEUCxTQUFPTyxTQUFQLENBQWlCQyxJQUFqQixDQUFzQlAsS0FBS0ksUUFBM0I7QUFDQUosT0FBS1EsT0FBTDtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJWLE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQjtBQUM3QkMsVUFBUUMsR0FBUixDQUFZSCxPQUFPSSxHQUFuQixFQUF3QixVQUF4QixFQUFvQ0gsS0FBS0ksUUFBTCxDQUFjQyxXQUFsRDtBQUNBTCxPQUFLUSxPQUFMO0FBQ0Q7O0FBRUQsU0FBU0UsU0FBVCxDQUFtQlgsTUFB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YUEsY0FBUSxJQUFSO0FBQ0EsYUFBSyxLQUFLVyxPQUFMLENBQWF6RSxFQUFiLENBQWdCaUYsTUFBckI7QUFDRUQsdUJBQWEsSUFBYjtBQUNBLGVBQUtuQixNQUFMLENBQVkvRCxJQUFaLENBQWlCaUYsUUFBakIsQ0FBMEJoQixDQUExQixHQUE4QixDQUFDLEVBQS9CO0FBQ0E7QUFDRixhQUFLLEtBQUtVLE9BQUwsQ0FBYXhFLElBQWIsQ0FBa0JnRixNQUF2QjtBQUNFRCx1QkFBYSxNQUFiO0FBQ0EsZUFBS25CLE1BQUwsQ0FBWS9ELElBQVosQ0FBaUJpRixRQUFqQixDQUEwQmhCLENBQTFCLEdBQThCLEVBQTlCO0FBQ0E7QUFSRjs7QUFXQSxVQUFJaUIsU0FBSixFQUFlO0FBQ2IsYUFBS25CLE1BQUwsQ0FBWU0sVUFBWixDQUF1QmUsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLckIsTUFBTCxDQUFZc0IsS0FBWixHQUFvQixDQUFwQjtBQUNEO0FBQ0Y7Ozs7RUFsSWlCN0UsT0FBT0QsSzs7QUFxSTNCLGVBQWUrRSxPQUFPQyxNQUFQLENBQWNoRixNQUFNaUYsU0FBcEIsRUFBK0IvRyxnQkFBL0IsQ0FBZiIsImZpbGUiOiJzdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaWxlZEludGVycHJldGVyIGZyb20gJy4uL2VuZ2luZS9UaWxlZEludGVycHJldGVyJztcblxuZnVuY3Rpb24gY29sbGVjdChlbnRpdHksIGl0ZW0pIHtcbiAgY29uc29sZS5sb2coZW50aXR5LmtleSwgJ2NvbGxlY3RzJywgaXRlbS5nYW1lRGF0YS5kaXNwbGF5TmFtZSk7XG4gIGlmICghZW50aXR5LmludmVudG9yeSkge1xuICAgIGVudGl0eS5pbnZlbnRvcnkgPSBbXTtcbiAgfVxuICBlbnRpdHkuaW52ZW50b3J5LnB1c2goaXRlbS5nYW1lRGF0YSk7XG4gIGl0ZW0uZGVzdHJveSgpO1xufVxuXG5mdW5jdGlvbiBjb25zdW1lKGVudGl0eSwgaXRlbSkge1xuICBjb25zb2xlLmxvZyhlbnRpdHkua2V5LCAnY29uc3VtZXMnLCBpdGVtLmdhbWVEYXRhLmRpc3BsYXlOYW1lKTtcbiAgaXRlbS5kZXN0cm95KCk7XG59XG5cbmZ1bmN0aW9uIGtub2NrRG9vcihlbnRpdHksIGRvb3IpIHtcbiAgaWYgKCFkb29yLmdhbWVEYXRhIHx8ICFkb29yLmdhbWVEYXRhLmtleSkge1xuICAgIGNvbnNvbGUud2FybihgZG9vciAke2Rvb3IuZ2FtZURhdGEubmFtZX0gZG9lc24ndCBoYXZlIG5vIGRhbW4gS0VZYCwgZG9vcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVudGl0eS5pbnZlbnRvcnkpIHtcbiAgICBjb25zdCBpdGVtID0gZW50aXR5LmludmVudG9yeS5maW5kKFxuICAgICAgaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdLZXknICYmIGl0ZW0uaWQgPT09IGRvb3IuZ2FtZURhdGEua2V5XG4gICAgKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZG9vci5kZXN0cm95KCk7XG4gICAgICBjb25zb2xlLmxvZyhgeW91IHVzZWQgdGhlICR7aXRlbS5kaXNwbGF5TmFtZX0ga2V5IG9uIHRoZSBkb29yIGFuZCBpdCBvcGVuZWRgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ25lZWQgc29tZSBrZXkgZm9yIHRoaXMgZG9vciBpZGlvdCcpO1xufVxuXG5mdW5jdGlvbiBnYXRlQ2FuT3BlbihnYXRlKSB7XG4gIHJldHVybiAoXG4gICAgZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnbm9ydGgnICYmIGdhdGUuYm9keS50b3VjaGluZy51cFxuICAgIHx8IGdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbiA9PT0gJ3NvdXRoJyAmJiBnYXRlLmJvZHkudG91Y2hpbmcuZG93blxuICAgIHx8IGdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbiA9PT0gJ3dlc3QnICYmIGdhdGUuYm9keS50b3VjaGluZy5sZWZ0XG4gICAgfHwgZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnZWFzdCcgJiYgZ2F0ZS5ib2R5LnRvdWNoaW5nLnJpZ2h0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGtub2NrR2F0ZShlbnRpdHksIGdhdGUpIHtcbiAgaWYgKCFnYXRlLmdhbWVEYXRhIHx8ICFnYXRlLmdhbWVEYXRhLm9wZW5EaXJlY3Rpb24pIHtcbiAgICBjb25zb2xlLndhcm4oYGdhdGUgJHtnYXRlLmdhbWVEYXRhLm5hbWV9IGFpbid0IGdvdCBubyBvcGVuRGlyZWN0aW9uYCwgZ2F0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChnYXRlQ2FuT3BlbihnYXRlKSkge1xuICAgIGdhdGUuZGVzdHJveSgpO1xuICAgIGNvbnNvbGUubG9nKCd0aGUgZ2F0ZSBoYXMgYSBoYW5kbGUgb24gdGhpcyBzaWRlLCB5b3Ugb3BlbmVkIGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3RoZSBnYXRlIGRvZXMgbm90IG9wZW4gZnJvbSB0aGlzIHNpZGUnKTtcbiAgfVxufVxuXG5jbGFzcyBTdGF0ZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gIGluaXQoKSB7XG4gICAgUGhhc2VyLkNhbnZhcy5zZXRJbWFnZVJlbmRlcmluZ0NyaXNwKHRoaXMuZ2FtZS5jYW52YXMpO1xuICB9XG4gIHByZWxvYWQoKSB7XG4gICAgdGhpcy5wcmVsb2FkVGlsZW1hcCgnbGV2ZWwxJywgJ2Fzc2V0cy9tYXBzL2xhcmdlci5qc29uJywgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL3Nwcml0ZXMvcGxheWVyLnBuZycsIDE2LCAxNik7XG4gIH1cbiAgY3JlYXRlKCkge1xuICAgIC8vIGxvYWRpbmcgc2NyZWVuIHdpbGwgaGF2ZSBhIHdoaXRlIGJhY2tncm91bmRcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuXG4gICAgLy8gc2NhbGluZyBvcHRpb25zXG4gICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuXG4gICAgLy8gaGF2ZSB0aGUgZ2FtZSBjZW50ZXJlZCBob3Jpem9udGFsbHlcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwID0gdGhpcy5jcmVhdGVUaWxlbWFwKCdsZXZlbDEnKTtcblxuICAgIHRoaXMubWFwTGF5ZXJzID0gW107XG4gICAgdGhpcy5jb2xsaWRlTGF5ZXJzID0gW107XG5cbiAgICB0aGlzLm1hcC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkTGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcihsYXllci5uYW1lKTtcbiAgICAgIGNyZWF0ZWRMYXllci5yZXNpemVXb3JsZCgpO1xuICAgICAgdGhpcy5tYXBMYXllcnMucHVzaChjcmVhdGVkTGF5ZXIpO1xuICAgICAgaWYgKGxheWVyLnByb3BlcnRpZXMuaW1wYXNzYWJsZSkge1xuICAgICAgICB0aGlzLmNvbGxpZGVMYXllcnMucHVzaChjcmVhdGVkTGF5ZXIpO1xuICAgICAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CeUV4Y2x1c2lvbihbXSwgdHJ1ZSwgY3JlYXRlZExheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG9iamVjdHNCeVR5cGUgPSB0aGlzLmFycmFuZ2VPYmplY3RzQnlUeXBlKHRoaXMuZ2V0T2JqZWN0c0Zyb21UaWxlbWFwKHRoaXMudGlsZW1hcCkpO1xuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuQ29uc3VtYWJsZSkge1xuICAgICAgdGhpcy5jb25zdW1hYmxlcyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgIHRoaXMuY29uc3VtYWJsZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBjb25zdCBjb25zdW1hYmxlcyA9IG9iamVjdHNCeVR5cGUuQ29uc3VtYWJsZTtcbiAgICAgIGNvbnN1bWFibGVzLmZvckVhY2goaXRlbSA9PiB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmNvbnN1bWFibGVzKSk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdHNCeVR5cGUuS2V5KSB7XG4gICAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICB0aGlzLmtleXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBjb25zdCBrZXlzID0gb2JqZWN0c0J5VHlwZS5LZXk7XG4gICAgICBrZXlzLmZvckVhY2goaXRlbSA9PiB0aGlzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmtleXMpKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0c0J5VHlwZS5Eb29yKSB7XG4gICAgICB0aGlzLmRvb3JzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy5kb29ycy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGRvb3JzID0gb2JqZWN0c0J5VHlwZS5Eb29yO1xuICAgICAgZG9vcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy5kb29ycyk7XG4gICAgICAgIHNwcml0ZS5ib2R5Lm1vdmVzID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0c0J5VHlwZS5HYXRlKSB7XG4gICAgICB0aGlzLmdhdGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdGhpcy5nYXRlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGdhdGVzID0gb2JqZWN0c0J5VHlwZS5HYXRlO1xuICAgICAgZ2F0ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy5nYXRlcyk7XG4gICAgICAgIHNwcml0ZS5ib2R5Lm1vdmVzID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgIC8vIGFkZCBwbGF5ZXJcbiAgICBjb25zdCBwbGF5ZXJTdGFydCA9IG9iamVjdHNCeVR5cGUuUGxheWVyU3RhcnRbMF07XG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmFkZC5zcHJpdGUocGxheWVyU3RhcnQueCwgcGxheWVyU3RhcnQueSAtIHBsYXllclN0YXJ0LmhlaWdodCwgJ3BsYXllcicpO1xuICAgIHRoaXMucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnd2FsaycsIFsgMSwgMiBdLCAxMCwgdHJ1ZSk7XG4gICAgdGhpcy5wbGF5ZXIuYW5jaG9yLnNldFRvKDAuNSwgMSk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRTaXplKDEwLCA4LCAzLCA4KTtcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgY29uc29sZS5sb2coJ3lvdSBhd2FrZW4gaW4gYSByb2NreSBmb3Jlc3QnKTtcbiAgICBjb25zb2xlLmxvZygndGhlcmUgYXJlIHBpeGVscyBhcm91bmQgeW91IHRoYXQgc2hvdWxkIHByb2JhYmx5IGJlIHRyYW5zcGFyZW50Jyk7XG4gICAgY29uc29sZS5sb2coJ3lvdSBzb21laG93IGtub3cgdGhhdCBpbiBvcmRlciB0byBsZWF2ZSB0aGlzIHBsYWNlJyk7XG4gICAgY29uc29sZS5sb2coJ3lvdSB3aWxsIGhhdmUgdG8gdW5sb2NrIHNvbWUgZG9vcnMuLi4nKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5jb2xsaWRlTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIGxheWVyKTtcbiAgICB9KTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5jb25zdW1hYmxlcywgY29uc3VtZSwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMua2V5cywgY29sbGVjdCwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZG9vcnMsIGtub2NrRG9vciwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZ2F0ZXMsIGtub2NrR2F0ZSwgbnVsbCwgdGhpcyk7XG4gICAgLy8gIFJlc2V0IHRoZSB0aGlzLnBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMDtcblxuICAgIGxldCBkaXJlY3Rpb24gPSAnJztcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bjpcbiAgICAgIGRpcmVjdGlvbiArPSAnbGVmdCc7XG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtNzU7XG4gICAgICB0aGlzLnBsYXllci5zY2FsZS54ID0gLTE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy5yaWdodC5pc0Rvd246XG4gICAgICBkaXJlY3Rpb24gKz0gJ3JpZ2h0JztcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDc1O1xuICAgICAgdGhpcy5wbGF5ZXIuc2NhbGUueCA9IDE7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHRoaXMuY3Vyc29ycy51cC5pc0Rvd246XG4gICAgICBkaXJlY3Rpb24gKz0gJ3VwJztcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC03NTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxuICAgICAgZGlyZWN0aW9uICs9ICdkb3duJztcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDc1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCd3YWxrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxheWVyLmZyYW1lID0gMDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihTdGF0ZS5wcm90b3R5cGUsIFRpbGVkSW50ZXJwcmV0ZXIpO1xuIl19