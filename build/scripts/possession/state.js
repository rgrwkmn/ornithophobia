var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

// create a sprite from an object
function createSpriteFromTiledObject(element, group) {
  if (!element.properties.sprite) {
    console.error('no sprite defined for element', element);
  }
  var sprite = group.create(element.x, element.y, element.properties.sprite);
  Object.assign(sprite, element.properties);
}

function collect(entity, item) {
  console.log('collect', entity, item);
  item.destroy();
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
      this.load.tilemap('level1', 'assets/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('gameTiles', 'assets/simples_pimples.png');
      this.load.spritesheet('skull-key', 'assets/skull-key.png', 16, 16);
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

      console.log('map', this.map);
      this.map.addTilesetImage('simples_pimples', // this.map.tilesets[0].name for some reason
      'gameTiles', 16, 16);

      this.mapLayers = [];
      this.collideLayers = [];

      this.map.layers.forEach(function (layer) {
        console.log(layer.name, layer);
        var createdLayer = _this2.map.createLayer(layer.name);
        createdLayer.resizeWorld();
        _this2.mapLayers.push(createdLayer);
        if (layer.properties.wall) {
          _this2.collideLayers.push(createdLayer);
          console.log('setCollisionBetween', createdLayer);
          // this.map.setCollisionBetween(1, layer.data.length * layer.data[0].length, true, layer.name);
          _this2.map.setCollisionByExclusion([], true, createdLayer);
        }
      });

      console.log(this.map.objects);
      this.items = this.game.add.group();
      this.items.enableBody = true;
      var items = findObjectsByType('item', this.map);
      items.forEach(function (item) {
        return createSpriteFromTiledObject(item, _this2.items);
      });

      // this.mapLayers[1].resizeWorld();

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = findObjectsByType('playerStart', this.map)[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y, 'player');
      this.player.scale.setTo(0.5, 0.5);
      this.physics.arcade.enable(this.player);
      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);
      this.game.camera.follow(this.player);

      console.log(this.map);
      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.collideLayers.forEach(function (layer) {
        _this3.game.physics.arcade.collide(_this3.player, layer);
      });
      this.game.physics.arcade.overlap(this.player, this.items, collect, null, this);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsiZmluZE9iamVjdHNCeVR5cGUiLCJ0eXBlIiwibWFwIiwicmVzdWx0IiwiT2JqZWN0Iiwia2V5cyIsIm9iamVjdHMiLCJmb3JFYWNoIiwia2V5IiwiZWxlbWVudCIsInkiLCJ0aWxlSGVpZ2h0IiwicHVzaCIsImNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdCIsImdyb3VwIiwicHJvcGVydGllcyIsInNwcml0ZSIsImNvbnNvbGUiLCJlcnJvciIsImNyZWF0ZSIsIngiLCJhc3NpZ24iLCJjb2xsZWN0IiwiZW50aXR5IiwiaXRlbSIsImxvZyIsImRlc3Ryb3kiLCJTdGF0ZSIsImxvYWQiLCJ0aWxlbWFwIiwiUGhhc2VyIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJpbWFnZSIsInNwcml0ZXNoZWV0IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic2NhbGUiLCJzY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJTSE9XX0FMTCIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJhZGQiLCJhZGRUaWxlc2V0SW1hZ2UiLCJtYXBMYXllcnMiLCJjb2xsaWRlTGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXIiLCJuYW1lIiwiY3JlYXRlZExheWVyIiwiY3JlYXRlTGF5ZXIiLCJyZXNpemVXb3JsZCIsIndhbGwiLCJzZXRDb2xsaXNpb25CeUV4Y2x1c2lvbiIsIml0ZW1zIiwiZW5hYmxlQm9keSIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJwbGF5ZXJTdGFydCIsInBsYXllciIsInNldFRvIiwiYXJjYWRlIiwiZW5hYmxlIiwiYW5pbWF0aW9ucyIsImNhbWVyYSIsImZvbGxvdyIsImN1cnNvcnMiLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsImNvbGxpZGUiLCJvdmVybGFwIiwiYm9keSIsInZlbG9jaXR5IiwidXAiLCJpc0Rvd24iLCJkb3duIiwibGVmdCIsInBsYXkiLCJyaWdodCIsImZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVNBLGlCQUFULENBQTJCQyxJQUEzQixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDcEMsTUFBSUMsU0FBUyxFQUFiO0FBQ0FDLFNBQU9DLElBQVAsQ0FBWUgsSUFBSUksT0FBaEIsRUFBeUJDLE9BQXpCLENBQWlDLGVBQU87QUFDdENMLFFBQUlJLE9BQUosQ0FBWUUsR0FBWixFQUFpQkQsT0FBakIsQ0FBeUIsbUJBQVc7QUFDbEMsVUFBR0UsUUFBUVIsSUFBUixLQUFpQkEsSUFBcEIsRUFBMEI7QUFDeEJRLGdCQUFRQyxDQUFSLElBQWFSLElBQUlTLFVBQWpCO0FBQ0FSLGVBQU9TLElBQVAsQ0FBWUgsT0FBWjtBQUNEO0FBQ0YsS0FMRDtBQU1ELEdBUEQ7QUFRQSxTQUFPTixNQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFTVSwyQkFBVCxDQUFxQ0osT0FBckMsRUFBOENLLEtBQTlDLEVBQXFEO0FBQ25ELE1BQUksQ0FBQ0wsUUFBUU0sVUFBUixDQUFtQkMsTUFBeEIsRUFBZ0M7QUFDOUJDLFlBQVFDLEtBQVIsQ0FBYywrQkFBZCxFQUErQ1QsT0FBL0M7QUFDRDtBQUNELE1BQUlPLFNBQVNGLE1BQU1LLE1BQU4sQ0FBYVYsUUFBUVcsQ0FBckIsRUFBd0JYLFFBQVFDLENBQWhDLEVBQW1DRCxRQUFRTSxVQUFSLENBQW1CQyxNQUF0RCxDQUFiO0FBQ0FaLFNBQU9pQixNQUFQLENBQWNMLE1BQWQsRUFBc0JQLFFBQVFNLFVBQTlCO0FBQ0Q7O0FBRUQsU0FBU08sT0FBVCxDQUFpQkMsTUFBakIsRUFBeUJDLElBQXpCLEVBQStCO0FBQzdCUCxVQUFRUSxHQUFSLENBQVksU0FBWixFQUF1QkYsTUFBdkIsRUFBK0JDLElBQS9CO0FBQ0FBLE9BQUtFLE9BQUw7QUFDRDs7SUFFS0MsSzs7Ozs7Ozs7Ozs7OEJBQ007QUFDUixXQUFLQyxJQUFM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QkMsUUFBakIsQ0FBMEJuRSxDQUExQixHQUE4QixDQUE5Qjs7QUFFQSxjQUFRLElBQVI7QUFDQSxhQUFLLEtBQUs0RCxPQUFMLENBQWFRLEVBQWIsQ0FBZ0JDLE1BQXJCO0FBQ0UsZUFBS2hCLE1BQUwsQ0FBWWEsSUFBWixDQUFpQkMsUUFBakIsQ0FBMEJuRSxDQUExQixHQUE4QixDQUFDLEdBQS9CO0FBQ0E7QUFDRixhQUFLLEtBQUs0RCxPQUFMLENBQWFVLElBQWIsQ0FBa0JELE1BQXZCO0FBQ0UsZUFBS2hCLE1BQUwsQ0FBWWEsSUFBWixDQUFpQkMsUUFBakIsQ0FBMEJuRSxDQUExQixHQUE4QixHQUE5QjtBQUNBO0FBTkY7QUFRQSxjQUFRLElBQVI7QUFDQSxhQUFLLEtBQUs0RCxPQUFMLENBQWFXLElBQWIsQ0FBa0JGLE1BQXZCO0FBQ0UsZUFBS2hCLE1BQUwsQ0FBWWEsSUFBWixDQUFpQkMsUUFBakIsQ0FBMEJ6RCxDQUExQixHQUE4QixDQUFDLEdBQS9CO0FBQ0EsZUFBSzJDLE1BQUwsQ0FBWUksVUFBWixDQUF1QmUsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDQTtBQUNGLGFBQUssS0FBS1osT0FBTCxDQUFhYSxLQUFiLENBQW1CSixNQUF4QjtBQUNFLGVBQUtoQixNQUFMLENBQVlhLElBQVosQ0FBaUJDLFFBQWpCLENBQTBCekQsQ0FBMUIsR0FBOEIsR0FBOUI7QUFDQSxlQUFLMkMsTUFBTCxDQUFZSSxVQUFaLENBQXVCZSxJQUF2QixDQUE0QixPQUE1QjtBQUNBO0FBQ0Y7QUFDRSxlQUFLbkIsTUFBTCxDQUFZcUIsS0FBWixHQUFvQixDQUFwQjtBQVZGO0FBWUQ7Ozs7RUE5RmlCdEQsT0FBT0gsSzs7QUFpRzNCLGVBQWVBLEtBQWYiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kT2JqZWN0c0J5VHlwZSh0eXBlLCBtYXApIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBPYmplY3Qua2V5cyhtYXAub2JqZWN0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgIG1hcC5vYmplY3RzW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmKGVsZW1lbnQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBlbGVtZW50LnkgLT0gbWFwLnRpbGVIZWlnaHQ7XG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gY3JlYXRlIGEgc3ByaXRlIGZyb20gYW4gb2JqZWN0XG5mdW5jdGlvbiBjcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoZWxlbWVudCwgZ3JvdXApIHtcbiAgaWYgKCFlbGVtZW50LnByb3BlcnRpZXMuc3ByaXRlKSB7XG4gICAgY29uc29sZS5lcnJvcignbm8gc3ByaXRlIGRlZmluZWQgZm9yIGVsZW1lbnQnLCBlbGVtZW50KTtcbiAgfVxuICB2YXIgc3ByaXRlID0gZ3JvdXAuY3JlYXRlKGVsZW1lbnQueCwgZWxlbWVudC55LCBlbGVtZW50LnByb3BlcnRpZXMuc3ByaXRlKTtcbiAgT2JqZWN0LmFzc2lnbihzcHJpdGUsIGVsZW1lbnQucHJvcGVydGllcyk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3QoZW50aXR5LCBpdGVtKSB7XG4gIGNvbnNvbGUubG9nKCdjb2xsZWN0JywgZW50aXR5LCBpdGVtKTtcbiAgaXRlbS5kZXN0cm95KCk7XG59XG5cbmNsYXNzIFN0YXRlIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcbiAgcHJlbG9hZCgpIHtcbiAgICB0aGlzLmxvYWQudGlsZW1hcCgnbGV2ZWwxJywgJ2Fzc2V0cy90dXRvcmlhbC5qc29uJywgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdnYW1lVGlsZXMnLCAnYXNzZXRzL3NpbXBsZXNfcGltcGxlcy5wbmcnKTtcbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3NrdWxsLWtleScsICdhc3NldHMvc2t1bGwta2V5LnBuZycsIDE2LCAxNik7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL2R1ZGUucG5nJywgMzIsIDQ4KTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgLy8gbG9hZGluZyBzY3JlZW4gd2lsbCBoYXZlIGEgd2hpdGUgYmFja2dyb3VuZFxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cbiAgICAvLyBzY2FsaW5nIG9wdGlvbnNcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG5cbiAgICAvLyBoYXZlIHRoZSBnYW1lIGNlbnRlcmVkIGhvcml6b250YWxseVxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuXG4gICAgdGhpcy5tYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAoJ2xldmVsMScpO1xuXG4gICAgY29uc29sZS5sb2coJ21hcCcsIHRoaXMubWFwKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoXG4gICAgICAnc2ltcGxlc19waW1wbGVzJywgLy8gdGhpcy5tYXAudGlsZXNldHNbMF0ubmFtZSBmb3Igc29tZSByZWFzb25cbiAgICAgICdnYW1lVGlsZXMnLCAxNiwgMTZcbiAgICApO1xuXG4gICAgdGhpcy5tYXBMYXllcnMgPSBbXTtcbiAgICB0aGlzLmNvbGxpZGVMYXllcnMgPSBbXTtcblxuICAgIHRoaXMubWFwLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGxheWVyLm5hbWUsIGxheWVyKTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRMYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKGxheWVyLm5hbWUpO1xuICAgICAgY3JlYXRlZExheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgICB0aGlzLm1hcExheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICBpZiAobGF5ZXIucHJvcGVydGllcy53YWxsKSB7XG4gICAgICAgIHRoaXMuY29sbGlkZUxheWVycy5wdXNoKGNyZWF0ZWRMYXllcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRDb2xsaXNpb25CZXR3ZWVuJywgY3JlYXRlZExheWVyKTtcbiAgICAgICAgLy8gdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCBsYXllci5kYXRhLmxlbmd0aCAqIGxheWVyLmRhdGFbMF0ubGVuZ3RoLCB0cnVlLCBsYXllci5uYW1lKTtcbiAgICAgICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQnlFeGNsdXNpb24oW10sIHRydWUsIGNyZWF0ZWRMYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLm1hcC5vYmplY3RzKTtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuaXRlbXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgY29uc3QgaXRlbXMgPSBmaW5kT2JqZWN0c0J5VHlwZSgnaXRlbScsIHRoaXMubWFwKTtcbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KGl0ZW0sIHRoaXMuaXRlbXMpKTtcblxuICAgIC8vIHRoaXMubWFwTGF5ZXJzWzFdLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgIC8vIGFkZCBwbGF5ZXJcbiAgICBjb25zdCBwbGF5ZXJTdGFydCA9IGZpbmRPYmplY3RzQnlUeXBlKCdwbGF5ZXJTdGFydCcsIHRoaXMubWFwKVswXTtcbiAgICB0aGlzLnBsYXllciA9IHRoaXMuYWRkLnNwcml0ZShwbGF5ZXJTdGFydC54LCBwbGF5ZXJTdGFydC55LCAncGxheWVyJyk7XG4gICAgdGhpcy5wbGF5ZXIuc2NhbGUuc2V0VG8oMC41LCAwLjUpO1xuICAgIHRoaXMucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIFsgMCwgMSwgMiwgMyBdLCAxMCwgdHJ1ZSk7XG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgWyA1LCA2LCA3LCA4IF0sIDEwLCB0cnVlKTtcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLm1hcCk7XG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5jb2xsaWRlTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIGxheWVyKTtcbiAgICB9KTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5pdGVtcywgY29sbGVjdCwgbnVsbCwgdGhpcyk7XG5cbiAgICAvLyAgUmVzZXQgdGhlIHRoaXMucGxheWVycyB2ZWxvY2l0eSAobW92ZW1lbnQpXG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMudXAuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTE1MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMTUwO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgdGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gLTE1MDtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMTUwO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMucGxheWVyLmZyYW1lID0gNDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4iXX0=