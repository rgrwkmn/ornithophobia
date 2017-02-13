var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TILE_SIZE = 16;

function findObjectsByType(type, map) {
  var result = [];
  Object.keys(map.objects).forEach(function (key) {
    map.objects[key].forEach(function (element) {
      if (element.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
  });
  return result;
}

function arrangeObjectsByType(map) {
  return Object.keys(map.objects).reduce(function (objects, key) {
    map.objects[key].forEach(function (object) {
      if (object.type) {
        if (!objects[object.type]) {
          objects[object.type] = [];
        }
        objects[object.type].push(object);
      } else {
        console.warn('object found without type', object.name, object);
      }
    });
    return objects;
  }, {});
}

// create a sprite from an object
function createSpriteFromTiledObject(element, group) {
  if (!element.properties || !element.properties.sprite) {
    console.error('no sprite defined for element', element);
    return;
  }
  var sprite = group.create(element.x, element.y - TILE_SIZE, element.properties.sprite);
  sprite.gameData = {
    name: element.name,
    type: element.type
  };
  Object.assign(sprite.gameData, element.properties);
  return sprite;
}

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
      this.load.tilemap('level1', 'assets/example.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('gameTiles', 'assets/simples_pimples.png');
      this.load.spritesheet('skull-key', 'assets/skull-key.png', 16, 16);
      this.load.spritesheet('gold-door', 'assets/gold-door.png', 16, 16);
      this.load.spritesheet('turkey-leg', 'assets/turkey-leg.png', 16, 16);
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

      this.map = this.game.add.tilemap('level1');

      this.map.addTilesetImage('simples_pimples', // this.map.tilesets[0].name for some reason
      'gameTiles', 16, 16);

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

      var objectsByType = arrangeObjectsByType(this.map);
      this.consumables = this.game.add.group();
      this.consumables.enableBody = true;
      var consumables = objectsByType.consumable;
      consumables.forEach(function (item) {
        return createSpriteFromTiledObject(item, _this2.consumables);
      });

      this.keys = this.game.add.group();
      this.keys.enableBody = true;
      var keys = objectsByType.key;
      keys.forEach(function (item) {
        return createSpriteFromTiledObject(item, _this2.keys);
      });

      this.doors = this.game.add.group();
      this.doors.enableBody = true;
      var doors = objectsByType.door;
      doors.forEach(function (item) {
        var sprite = createSpriteFromTiledObject(item, _this2.doors);
        sprite.body.moves = false;
      });

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = objectsByType.playerStart[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y - TILE_SIZE, 'player');
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

export default State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsiVElMRV9TSVpFIiwiZmluZE9iamVjdHNCeVR5cGUiLCJ0eXBlIiwibWFwIiwicmVzdWx0IiwiT2JqZWN0Iiwia2V5cyIsIm9iamVjdHMiLCJmb3JFYWNoIiwia2V5IiwiZWxlbWVudCIsInkiLCJ0aWxlSGVpZ2h0IiwicHVzaCIsImFycmFuZ2VPYmplY3RzQnlUeXBlIiwicmVkdWNlIiwib2JqZWN0IiwiY29uc29sZSIsIndhcm4iLCJuYW1lIiwiY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0IiwiZ3JvdXAiLCJwcm9wZXJ0aWVzIiwic3ByaXRlIiwiZXJyb3IiLCJjcmVhdGUiLCJ4IiwiZ2FtZURhdGEiLCJhc3NpZ24iLCJjb2xsZWN0IiwiZW50aXR5IiwiaXRlbSIsImxvZyIsImludmVudG9yeSIsImRlc3Ryb3kiLCJjb25zdW1lIiwia25vY2siLCJkb29yIiwic29tZSIsImlkIiwiU3RhdGUiLCJsb2FkIiwidGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiaW1hZ2UiLCJzcHJpdGVzaGVldCIsImdhbWUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInNjYWxlIiwic2NhbGVNb2RlIiwiU2NhbGVNYW5hZ2VyIiwiU0hPV19BTEwiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5IiwiYWRkIiwiYWRkVGlsZXNldEltYWdlIiwibWFwTGF5ZXJzIiwiY29sbGlkZUxheWVycyIsImxheWVycyIsImNyZWF0ZWRMYXllciIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJyZXNpemVXb3JsZCIsImltcGFzc2FibGUiLCJzZXRDb2xsaXNpb25CeUV4Y2x1c2lvbiIsIm9iamVjdHNCeVR5cGUiLCJjb25zdW1hYmxlcyIsImVuYWJsZUJvZHkiLCJjb25zdW1hYmxlIiwiZG9vcnMiLCJib2R5IiwibW92ZXMiLCJwaHlzaWNzIiwic3RhcnRTeXN0ZW0iLCJQaHlzaWNzIiwiQVJDQURFIiwicGxheWVyU3RhcnQiLCJwbGF5ZXIiLCJzZXRUbyIsImFyY2FkZSIsImVuYWJsZSIsImFuaW1hdGlvbnMiLCJjYW1lcmEiLCJmb2xsb3ciLCJjdXJzb3JzIiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJjb2xsaWRlIiwib3ZlcmxhcCIsInZlbG9jaXR5IiwidXAiLCJpc0Rvd24iLCJkb3duIiwibGVmdCIsInBsYXkiLCJyaWdodCIsImZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLFlBQVksRUFBbEI7O0FBRUEsU0FBU0MsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDQyxHQUFqQyxFQUFzQztBQUNwQyxNQUFJQyxTQUFTLEVBQWI7QUFDQUMsU0FBT0MsSUFBUCxDQUFZSCxJQUFJSSxPQUFoQixFQUF5QkMsT0FBekIsQ0FBaUMsZUFBTztBQUN0Q0wsUUFBSUksT0FBSixDQUFZRSxHQUFaLEVBQWlCRCxPQUFqQixDQUF5QixtQkFBVztBQUNsQyxVQUFHRSxRQUFRUixJQUFSLEtBQWlCQSxJQUFwQixFQUEwQjtBQUN4QlEsZ0JBQVFDLENBQVIsSUFBYVIsSUFBSVMsVUFBakI7QUFDQVIsZUFBT1MsSUFBUCxDQUFZSCxPQUFaO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FQRDtBQVFBLFNBQU9OLE1BQVA7QUFDRDs7QUFFRCxTQUFTVSxvQkFBVCxDQUE4QlgsR0FBOUIsRUFBbUM7QUFDakMsU0FBT0UsT0FBT0MsSUFBUCxDQUFZSCxJQUFJSSxPQUFoQixFQUF5QlEsTUFBekIsQ0FBZ0MsVUFBQ1IsT0FBRCxFQUFVRSxHQUFWLEVBQWtCO0FBQ3ZETixRQUFJSSxPQUFKLENBQVlFLEdBQVosRUFBaUJELE9BQWpCLENBQXlCLGtCQUFVO0FBQ2pDLFVBQUlRLE9BQU9kLElBQVgsRUFBaUI7QUFDZixZQUFJLENBQUNLLFFBQVFTLE9BQU9kLElBQWYsQ0FBTCxFQUEyQjtBQUN6Qkssa0JBQVFTLE9BQU9kLElBQWYsSUFBdUIsRUFBdkI7QUFDRDtBQUNESyxnQkFBUVMsT0FBT2QsSUFBZixFQUFxQlcsSUFBckIsQ0FBMEJHLE1BQTFCO0FBQ0QsT0FMRCxNQUtPO0FBQ0xDLGdCQUFRQyxJQUFSLENBQWEsMkJBQWIsRUFBMENGLE9BQU9HLElBQWpELEVBQXVESCxNQUF2RDtBQUNEO0FBQ0YsS0FURDtBQVVBLFdBQU9ULE9BQVA7QUFDRCxHQVpNLEVBWUosRUFaSSxDQUFQO0FBYUQ7O0FBRUQ7QUFDQSxTQUFTYSwyQkFBVCxDQUFxQ1YsT0FBckMsRUFBOENXLEtBQTlDLEVBQXFEO0FBQ25ELE1BQUksQ0FBQ1gsUUFBUVksVUFBVCxJQUF1QixDQUFDWixRQUFRWSxVQUFSLENBQW1CQyxNQUEvQyxFQUF1RDtBQUNyRE4sWUFBUU8sS0FBUixDQUFjLCtCQUFkLEVBQStDZCxPQUEvQztBQUNBO0FBQ0Q7QUFDRCxNQUFNYSxTQUFTRixNQUFNSSxNQUFOLENBQWFmLFFBQVFnQixDQUFyQixFQUF3QmhCLFFBQVFDLENBQVIsR0FBWVgsU0FBcEMsRUFBK0NVLFFBQVFZLFVBQVIsQ0FBbUJDLE1BQWxFLENBQWY7QUFDQUEsU0FBT0ksUUFBUCxHQUFrQjtBQUNoQlIsVUFBTVQsUUFBUVMsSUFERTtBQUVoQmpCLFVBQU1RLFFBQVFSO0FBRkUsR0FBbEI7QUFJQUcsU0FBT3VCLE1BQVAsQ0FBY0wsT0FBT0ksUUFBckIsRUFBK0JqQixRQUFRWSxVQUF2QztBQUNBLFNBQU9DLE1BQVA7QUFDRDs7QUFFRCxTQUFTTSxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0JkLFVBQVFlLEdBQVIsQ0FBWUYsT0FBT3JCLEdBQW5CLEVBQXdCLFVBQXhCLEVBQW9Dc0IsS0FBS0osUUFBTCxDQUFjUixJQUFsRDtBQUNBLE1BQUksQ0FBQ1csT0FBT0csU0FBWixFQUF1QjtBQUNyQkgsV0FBT0csU0FBUCxHQUFtQixFQUFuQjtBQUNEO0FBQ0RILFNBQU9HLFNBQVAsQ0FBaUJwQixJQUFqQixDQUFzQmtCLEtBQUtKLFFBQTNCO0FBQ0FJLE9BQUtHLE9BQUw7QUFDRDs7QUFFRCxTQUFTQyxPQUFULENBQWlCTCxNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0JkLFVBQVFlLEdBQVIsQ0FBWUYsT0FBT3JCLEdBQW5CLEVBQXdCLFVBQXhCLEVBQW9Dc0IsS0FBS0osUUFBTCxDQUFjUixJQUFsRDtBQUNBWSxPQUFLRyxPQUFMO0FBQ0Q7O0FBRUQsU0FBU0UsS0FBVCxDQUFlTixNQUFmLEVBQXVCTyxJQUF2QixFQUE2QjtBQUMzQjtBQUNBLE1BQUksQ0FBQ0EsS0FBS1YsUUFBTixJQUFrQixDQUFDVSxLQUFLVixRQUFMLENBQWNsQixHQUFyQyxFQUEwQztBQUN4Q1EsWUFBUUMsSUFBUixXQUFxQm1CLEtBQUtWLFFBQUwsQ0FBY1IsSUFBbkMsaUNBQW9Fa0IsSUFBcEU7QUFDQTtBQUNEOztBQUVELE1BQUlQLE9BQU9HLFNBQVAsSUFBb0JILE9BQU9HLFNBQVAsQ0FBaUJLLElBQWpCLENBQ3RCO0FBQUEsV0FBUVAsS0FBSzdCLElBQUwsS0FBYyxLQUFkLElBQXVCNkIsS0FBS1EsRUFBTCxLQUFZRixLQUFLVixRQUFMLENBQWNsQixHQUF6RDtBQUFBLEdBRHNCLENBQXhCLEVBRUc7QUFDRDRCLFNBQUtILE9BQUw7QUFDRCxHQUpELE1BSU87QUFDTGpCLFlBQVFlLEdBQVIsQ0FBWSxtQ0FBWjtBQUNEO0FBQ0Y7O0lBRUtRLEs7Ozs7Ozs7Ozs7OzhCQUNNO0FBQ1IsV0FBS0MsSUFBTCxDQUFVQyxPQUFWLENBQWtCLFFBQWxCLEVBQTRCLHFCQUE1QixFQUFtRCxJQUFuRCxFQUF5REMsT0FBT0MsT0FBUCxDQUFlQyxVQUF4RTtBQUNBLFdBQUtKLElBQUwsQ0FBVUssS0FBVixDQUFnQixXQUFoQixFQUE2Qiw0QkFBN0I7QUFDQSxXQUFLTCxJQUFMLENBQVVNLFdBQVYsQ0FBc0IsV0FBdEIsRUFBbUMsc0JBQW5DLEVBQTJELEVBQTNELEVBQStELEVBQS9EO0FBQ0EsV0FBS04sSUFBTCxDQUFVTSxXQUFWLENBQXNCLFdBQXRCLEVBQW1DLHNCQUFuQyxFQUEyRCxFQUEzRCxFQUErRCxFQUEvRDtBQUNBLFdBQUtOLElBQUwsQ0FBVU0sV0FBVixDQUFzQixZQUF0QixFQUFvQyx1QkFBcEMsRUFBNkQsRUFBN0QsRUFBaUUsRUFBakU7QUFDQSxXQUFLTixJQUFMLENBQVVNLFdBQVYsQ0FBc0IsUUFBdEIsRUFBZ0MsaUJBQWhDLEVBQW1ELEVBQW5ELEVBQXVELEVBQXZEO0FBQ0Q7Ozs2QkFDUTtBQUFBOztBQUNQO0FBQ0EsV0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxlQUFoQixHQUFrQyxNQUFsQzs7QUFFQTtBQUNBLFdBQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QlQsT0FBT1UsWUFBUCxDQUFvQkMsUUFBM0M7O0FBRUE7QUFDQSxXQUFLSCxLQUFMLENBQVdJLHFCQUFYLEdBQW1DLElBQW5DO0FBQ0EsV0FBS0osS0FBTCxDQUFXSyxtQkFBWCxHQUFpQyxJQUFqQzs7QUFFQSxXQUFLckQsR0FBTCxHQUFXLEtBQUs2QyxJQUFMLENBQVVTLEdBQVYsQ0FBY2YsT0FBZCxDQUFzQixRQUF0QixDQUFYOztBQUVBLFdBQUt2QyxHQUFMLENBQVN1RCxlQUFULENBQ0UsaUJBREYsRUFDcUI7QUFDbkIsaUJBRkYsRUFFZSxFQUZmLEVBRW1CLEVBRm5COztBQUtBLFdBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxXQUFLQyxhQUFMLEdBQXFCLEVBQXJCOztBQUVBLFdBQUt6RCxHQUFMLENBQVMwRCxNQUFULENBQWdCckQsT0FBaEIsQ0FBd0IsaUJBQVM7QUFDL0IsWUFBTXNELGVBQWUsT0FBSzNELEdBQUwsQ0FBUzRELFdBQVQsQ0FBcUJDLE1BQU03QyxJQUEzQixDQUFyQjtBQUNBMkMscUJBQWFHLFdBQWI7QUFDQSxlQUFLTixTQUFMLENBQWU5QyxJQUFmLENBQW9CaUQsWUFBcEI7QUFDQSxZQUFJRSxNQUFNMUMsVUFBTixDQUFpQjRDLFVBQXJCLEVBQWlDO0FBQy9CLGlCQUFLTixhQUFMLENBQW1CL0MsSUFBbkIsQ0FBd0JpRCxZQUF4QjtBQUNBLGlCQUFLM0QsR0FBTCxDQUFTZ0UsdUJBQVQsQ0FBaUMsRUFBakMsRUFBcUMsSUFBckMsRUFBMkNMLFlBQTNDO0FBQ0Q7QUFDRixPQVJEOztBQVVBLFVBQU1NLGdCQUFnQnRELHFCQUFxQixLQUFLWCxHQUExQixDQUF0QjtBQUNBLFdBQUtrRSxXQUFMLEdBQW1CLEtBQUtyQixJQUFMLENBQVVTLEdBQVYsQ0FBY3BDLEtBQWQsRUFBbkI7QUFDQSxXQUFLZ0QsV0FBTCxDQUFpQkMsVUFBakIsR0FBOEIsSUFBOUI7QUFDQSxVQUFNRCxjQUFjRCxjQUFjRyxVQUFsQztBQUNBRixrQkFBWTdELE9BQVosQ0FBb0I7QUFBQSxlQUFRWSw0QkFBNEJXLElBQTVCLEVBQWtDLE9BQUtzQyxXQUF2QyxDQUFSO0FBQUEsT0FBcEI7O0FBRUEsV0FBSy9ELElBQUwsR0FBWSxLQUFLMEMsSUFBTCxDQUFVUyxHQUFWLENBQWNwQyxLQUFkLEVBQVo7QUFDQSxXQUFLZixJQUFMLENBQVVnRSxVQUFWLEdBQXVCLElBQXZCO0FBQ0EsVUFBTWhFLE9BQU84RCxjQUFjM0QsR0FBM0I7QUFDQUgsV0FBS0UsT0FBTCxDQUFhO0FBQUEsZUFBUVksNEJBQTRCVyxJQUE1QixFQUFrQyxPQUFLekIsSUFBdkMsQ0FBUjtBQUFBLE9BQWI7O0FBRUEsV0FBS2tFLEtBQUwsR0FBYSxLQUFLeEIsSUFBTCxDQUFVUyxHQUFWLENBQWNwQyxLQUFkLEVBQWI7QUFDQSxXQUFLbUQsS0FBTCxDQUFXRixVQUFYLEdBQXdCLElBQXhCO0FBQ0EsVUFBTUUsUUFBUUosY0FBYy9CLElBQTVCO0FBQ0FtQyxZQUFNaEUsT0FBTixDQUFjLGdCQUFRO0FBQ3BCLFlBQU1lLFNBQVNILDRCQUE0QlcsSUFBNUIsRUFBa0MsT0FBS3lDLEtBQXZDLENBQWY7QUFDQWpELGVBQU9rRCxJQUFQLENBQVlDLEtBQVosR0FBb0IsS0FBcEI7QUFDRCxPQUhEOztBQUtBLFdBQUtDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QmpDLE9BQU9rQyxPQUFQLENBQWVDLE1BQXhDOztBQUVBO0FBQ0EsVUFBTUMsY0FBY1gsY0FBY1csV0FBZCxDQUEwQixDQUExQixDQUFwQjtBQUNBLFdBQUtDLE1BQUwsR0FBYyxLQUFLdkIsR0FBTCxDQUFTbEMsTUFBVCxDQUFnQndELFlBQVlyRCxDQUE1QixFQUErQnFELFlBQVlwRSxDQUFaLEdBQWdCWCxTQUEvQyxFQUEwRCxRQUExRCxDQUFkO0FBQ0EsV0FBS2dGLE1BQUwsQ0FBWTdCLEtBQVosQ0FBa0I4QixLQUFsQixDQUF3QixHQUF4QixFQUE2QixHQUE3QjtBQUNBLFdBQUtOLE9BQUwsQ0FBYU8sTUFBYixDQUFvQkMsTUFBcEIsQ0FBMkIsS0FBS0gsTUFBaEM7QUFDQSxXQUFLQSxNQUFMLENBQVlJLFVBQVosQ0FBdUIzQixHQUF2QixDQUEyQixNQUEzQixFQUFtQyxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVgsQ0FBbkMsRUFBbUQsRUFBbkQsRUFBdUQsSUFBdkQ7QUFDQSxXQUFLdUIsTUFBTCxDQUFZSSxVQUFaLENBQXVCM0IsR0FBdkIsQ0FBMkIsT0FBM0IsRUFBb0MsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBVyxDQUFYLENBQXBDLEVBQW9ELEVBQXBELEVBQXdELElBQXhEO0FBQ0EsV0FBS1QsSUFBTCxDQUFVcUMsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0IsS0FBS04sTUFBN0I7O0FBRUEsV0FBS08sT0FBTCxHQUFlLEtBQUt2QyxJQUFMLENBQVV3QyxLQUFWLENBQWdCQyxRQUFoQixDQUF5QkMsZ0JBQXpCLEVBQWY7QUFDRDs7OzZCQUNRO0FBQUE7O0FBQ1AsV0FBSzlCLGFBQUwsQ0FBbUJwRCxPQUFuQixDQUEyQixpQkFBUztBQUNsQyxlQUFLd0MsSUFBTCxDQUFVMkIsT0FBVixDQUFrQk8sTUFBbEIsQ0FBeUJTLE9BQXpCLENBQWlDLE9BQUtYLE1BQXRDLEVBQThDaEIsS0FBOUM7QUFDRCxPQUZEO0FBR0EsV0FBS2hCLElBQUwsQ0FBVTJCLE9BQVYsQ0FBa0JPLE1BQWxCLENBQXlCVSxPQUF6QixDQUFpQyxLQUFLWixNQUF0QyxFQUE4QyxLQUFLWCxXQUFuRCxFQUFnRWxDLE9BQWhFLEVBQXlFLElBQXpFLEVBQStFLElBQS9FO0FBQ0EsV0FBS2EsSUFBTCxDQUFVMkIsT0FBVixDQUFrQk8sTUFBbEIsQ0FBeUJVLE9BQXpCLENBQWlDLEtBQUtaLE1BQXRDLEVBQThDLEtBQUsxRSxJQUFuRCxFQUF5RHVCLE9BQXpELEVBQWtFLElBQWxFLEVBQXdFLElBQXhFO0FBQ0EsV0FBS21CLElBQUwsQ0FBVTJCLE9BQVYsQ0FBa0JPLE1BQWxCLENBQXlCUyxPQUF6QixDQUFpQyxLQUFLWCxNQUF0QyxFQUE4QyxLQUFLUixLQUFuRCxFQUEwRHBDLEtBQTFELEVBQWlFLElBQWpFLEVBQXVFLElBQXZFO0FBQ0E7QUFDQSxXQUFLNEMsTUFBTCxDQUFZUCxJQUFaLENBQWlCb0IsUUFBakIsQ0FBMEJuRSxDQUExQixHQUE4QixDQUE5QjtBQUNBLFdBQUtzRCxNQUFMLENBQVlQLElBQVosQ0FBaUJvQixRQUFqQixDQUEwQmxGLENBQTFCLEdBQThCLENBQTlCOztBQUVBLGNBQVEsSUFBUjtBQUNBLGFBQUssS0FBSzRFLE9BQUwsQ0FBYU8sRUFBYixDQUFnQkMsTUFBckI7QUFDRSxlQUFLZixNQUFMLENBQVlQLElBQVosQ0FBaUJvQixRQUFqQixDQUEwQmxGLENBQTFCLEdBQThCLENBQUMsR0FBL0I7QUFDQTtBQUNGLGFBQUssS0FBSzRFLE9BQUwsQ0FBYVMsSUFBYixDQUFrQkQsTUFBdkI7QUFDRSxlQUFLZixNQUFMLENBQVlQLElBQVosQ0FBaUJvQixRQUFqQixDQUEwQmxGLENBQTFCLEdBQThCLEdBQTlCO0FBQ0E7QUFORjtBQVFBLGNBQVEsSUFBUjtBQUNBLGFBQUssS0FBSzRFLE9BQUwsQ0FBYVUsSUFBYixDQUFrQkYsTUFBdkI7QUFDRSxlQUFLZixNQUFMLENBQVlQLElBQVosQ0FBaUJvQixRQUFqQixDQUEwQm5FLENBQTFCLEdBQThCLENBQUMsR0FBL0I7QUFDQSxlQUFLc0QsTUFBTCxDQUFZSSxVQUFaLENBQXVCYyxJQUF2QixDQUE0QixNQUE1QjtBQUNBO0FBQ0YsYUFBSyxLQUFLWCxPQUFMLENBQWFZLEtBQWIsQ0FBbUJKLE1BQXhCO0FBQ0UsZUFBS2YsTUFBTCxDQUFZUCxJQUFaLENBQWlCb0IsUUFBakIsQ0FBMEJuRSxDQUExQixHQUE4QixHQUE5QjtBQUNBLGVBQUtzRCxNQUFMLENBQVlJLFVBQVosQ0FBdUJjLElBQXZCLENBQTRCLE9BQTVCO0FBQ0E7QUFDRjtBQUNFLGVBQUtsQixNQUFMLENBQVlvQixLQUFaLEdBQW9CLENBQXBCO0FBVkY7QUFZRDs7OztFQXZHaUJ6RCxPQUFPSCxLOztBQTBHM0IsZUFBZUEsS0FBZiIsImZpbGUiOiJzdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRJTEVfU0laRSA9IDE2O1xuXG5mdW5jdGlvbiBmaW5kT2JqZWN0c0J5VHlwZSh0eXBlLCBtYXApIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBPYmplY3Qua2V5cyhtYXAub2JqZWN0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgIG1hcC5vYmplY3RzW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmKGVsZW1lbnQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBlbGVtZW50LnkgLT0gbWFwLnRpbGVIZWlnaHQ7XG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gYXJyYW5nZU9iamVjdHNCeVR5cGUobWFwKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhtYXAub2JqZWN0cykucmVkdWNlKChvYmplY3RzLCBrZXkpID0+IHtcbiAgICBtYXAub2JqZWN0c1trZXldLmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgIGlmIChvYmplY3QudHlwZSkge1xuICAgICAgICBpZiAoIW9iamVjdHNbb2JqZWN0LnR5cGVdKSB7XG4gICAgICAgICAgb2JqZWN0c1tvYmplY3QudHlwZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3RzW29iamVjdC50eXBlXS5wdXNoKG9iamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ29iamVjdCBmb3VuZCB3aXRob3V0IHR5cGUnLCBvYmplY3QubmFtZSwgb2JqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfSwge30pO1xufVxuXG4vLyBjcmVhdGUgYSBzcHJpdGUgZnJvbSBhbiBvYmplY3RcbmZ1bmN0aW9uIGNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChlbGVtZW50LCBncm91cCkge1xuICBpZiAoIWVsZW1lbnQucHJvcGVydGllcyB8fCAhZWxlbWVudC5wcm9wZXJ0aWVzLnNwcml0ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ25vIHNwcml0ZSBkZWZpbmVkIGZvciBlbGVtZW50JywgZWxlbWVudCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNwcml0ZSA9IGdyb3VwLmNyZWF0ZShlbGVtZW50LngsIGVsZW1lbnQueSAtIFRJTEVfU0laRSwgZWxlbWVudC5wcm9wZXJ0aWVzLnNwcml0ZSk7XG4gIHNwcml0ZS5nYW1lRGF0YSA9IHtcbiAgICBuYW1lOiBlbGVtZW50Lm5hbWUsXG4gICAgdHlwZTogZWxlbWVudC50eXBlXG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3ByaXRlLmdhbWVEYXRhLCBlbGVtZW50LnByb3BlcnRpZXMpO1xuICByZXR1cm4gc3ByaXRlO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0KGVudGl0eSwgaXRlbSkge1xuICBjb25zb2xlLmxvZyhlbnRpdHkua2V5LCAnY29sbGVjdHMnLCBpdGVtLmdhbWVEYXRhLm5hbWUpO1xuICBpZiAoIWVudGl0eS5pbnZlbnRvcnkpIHtcbiAgICBlbnRpdHkuaW52ZW50b3J5ID0gW107XG4gIH1cbiAgZW50aXR5LmludmVudG9yeS5wdXNoKGl0ZW0uZ2FtZURhdGEpO1xuICBpdGVtLmRlc3Ryb3koKTtcbn1cblxuZnVuY3Rpb24gY29uc3VtZShlbnRpdHksIGl0ZW0pIHtcbiAgY29uc29sZS5sb2coZW50aXR5LmtleSwgJ2NvbnN1bWVzJywgaXRlbS5nYW1lRGF0YS5uYW1lKTtcbiAgaXRlbS5kZXN0cm95KCk7XG59XG5cbmZ1bmN0aW9uIGtub2NrKGVudGl0eSwgZG9vcikge1xuICAvLyBjb25zb2xlLmxvZygna25vY2snLCBlbnRpdHksIGRvb3IpO1xuICBpZiAoIWRvb3IuZ2FtZURhdGEgfHwgIWRvb3IuZ2FtZURhdGEua2V5KSB7XG4gICAgY29uc29sZS53YXJuKGBkb29yICR7ZG9vci5nYW1lRGF0YS5uYW1lfSBkb2Vzbid0IGhhdmUgbm8gZGFtbiBLRVlgLCBkb29yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZW50aXR5LmludmVudG9yeSAmJiBlbnRpdHkuaW52ZW50b3J5LnNvbWUoXG4gICAgaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdrZXknICYmIGl0ZW0uaWQgPT09IGRvb3IuZ2FtZURhdGEua2V5XG4gICkpIHtcbiAgICBkb29yLmRlc3Ryb3koKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnbmVlZCBzb21lIGtleSBmb3IgdGhpcyBkb29yIGlkaW90Jyk7XG4gIH1cbn1cblxuY2xhc3MgU3RhdGUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICBwcmVsb2FkKCkge1xuICAgIHRoaXMubG9hZC50aWxlbWFwKCdsZXZlbDEnLCAnYXNzZXRzL2V4YW1wbGUuanNvbicsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnZ2FtZVRpbGVzJywgJ2Fzc2V0cy9zaW1wbGVzX3BpbXBsZXMucG5nJyk7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdza3VsbC1rZXknLCAnYXNzZXRzL3NrdWxsLWtleS5wbmcnLCAxNiwgMTYpO1xuICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnZ29sZC1kb29yJywgJ2Fzc2V0cy9nb2xkLWRvb3IucG5nJywgMTYsIDE2KTtcbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3R1cmtleS1sZWcnLCAnYXNzZXRzL3R1cmtleS1sZWcucG5nJywgMTYsIDE2KTtcbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICdhc3NldHMvZHVkZS5wbmcnLCAzMiwgNDgpO1xuICB9XG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBsb2FkaW5nIHNjcmVlbiB3aWxsIGhhdmUgYSB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcblxuICAgIC8vIHNjYWxpbmcgb3B0aW9uc1xuICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcblxuICAgIC8vIGhhdmUgdGhlIGdhbWUgY2VudGVyZWQgaG9yaXpvbnRhbGx5XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XG5cbiAgICB0aGlzLm1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcCgnbGV2ZWwxJyk7XG5cbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoXG4gICAgICAnc2ltcGxlc19waW1wbGVzJywgLy8gdGhpcy5tYXAudGlsZXNldHNbMF0ubmFtZSBmb3Igc29tZSByZWFzb25cbiAgICAgICdnYW1lVGlsZXMnLCAxNiwgMTZcbiAgICApO1xuXG4gICAgdGhpcy5tYXBMYXllcnMgPSBbXTtcbiAgICB0aGlzLmNvbGxpZGVMYXllcnMgPSBbXTtcblxuICAgIHRoaXMubWFwLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRMYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKGxheWVyLm5hbWUpO1xuICAgICAgY3JlYXRlZExheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgICB0aGlzLm1hcExheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICBpZiAobGF5ZXIucHJvcGVydGllcy5pbXBhc3NhYmxlKSB7XG4gICAgICAgIHRoaXMuY29sbGlkZUxheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJ5RXhjbHVzaW9uKFtdLCB0cnVlLCBjcmVhdGVkTGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb2JqZWN0c0J5VHlwZSA9IGFycmFuZ2VPYmplY3RzQnlUeXBlKHRoaXMubWFwKTtcbiAgICB0aGlzLmNvbnN1bWFibGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuY29uc3VtYWJsZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgY29uc3QgY29uc3VtYWJsZXMgPSBvYmplY3RzQnlUeXBlLmNvbnN1bWFibGU7XG4gICAgY29uc3VtYWJsZXMuZm9yRWFjaChpdGVtID0+IGNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmNvbnN1bWFibGVzKSk7XG5cbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5rZXlzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIGNvbnN0IGtleXMgPSBvYmplY3RzQnlUeXBlLmtleTtcbiAgICBrZXlzLmZvckVhY2goaXRlbSA9PiBjcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgdGhpcy5rZXlzKSk7XG5cbiAgICB0aGlzLmRvb3JzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuZG9vcnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgY29uc3QgZG9vcnMgPSBvYmplY3RzQnlUeXBlLmRvb3I7XG4gICAgZG9vcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IGNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCB0aGlzLmRvb3JzKTtcbiAgICAgIHNwcml0ZS5ib2R5Lm1vdmVzID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgIC8vIGFkZCBwbGF5ZXJcbiAgICBjb25zdCBwbGF5ZXJTdGFydCA9IG9iamVjdHNCeVR5cGUucGxheWVyU3RhcnRbMF07XG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmFkZC5zcHJpdGUocGxheWVyU3RhcnQueCwgcGxheWVyU3RhcnQueSAtIFRJTEVfU0laRSwgJ3BsYXllcicpO1xuICAgIHRoaXMucGxheWVyLnNjYWxlLnNldFRvKDAuNSwgMC41KTtcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ2xlZnQnLCBbIDAsIDEsIDIsIDMgXSwgMTAsIHRydWUpO1xuICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdyaWdodCcsIFsgNSwgNiwgNywgOCBdLCAxMCwgdHJ1ZSk7XG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5jb2xsaWRlTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIGxheWVyKTtcbiAgICB9KTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5jb25zdW1hYmxlcywgY29uc3VtZSwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMua2V5cywgY29sbGVjdCwgbnVsbCwgdGhpcyk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZG9vcnMsIGtub2NrLCBudWxsLCB0aGlzKTtcbiAgICAvLyAgUmVzZXQgdGhlIHRoaXMucGxheWVycyB2ZWxvY2l0eSAobW92ZW1lbnQpXG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMudXAuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTE1MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMTUwO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gLTE1MDtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMTUwO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMucGxheWVyLmZyYW1lID0gNDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4iXX0=