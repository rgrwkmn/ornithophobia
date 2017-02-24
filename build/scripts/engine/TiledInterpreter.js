/**
 * Methods for interpreting Tiled map data into the game
 * intended to extend Phaser.State
 */
var TiledInterpreter = {
  preloadTilemap: function preloadTilemap(name, jsonLocation) {
    var _this = this;

    this.load.onFileComplete.add(function (progress, key) {
      if (key === name) {
        _this.preloadTilemapAssets(name);
      }
    });
    this.load.tilemap(name, jsonLocation, null, Phaser.Tilemap.TILED_JSON);
  },
  preloadTilemapAssets: function preloadTilemapAssets(name) {
    var _this2 = this;

    this.tilemap = this.cache.getTilemapData(name);
    // load tileset images
    this.tilemap.data.tilesets.forEach(function (set) {
      // TODO this is based on the relative paths all being to the assets folder or something
      _this2.load.image(set.name, '/assets/' + set.image.replace(/(\.\.\/)+/, ''));
    });
    // load object sprites
    this.getSpritesFromTilemap(this.tilemap).forEach(function (object) {
      _this2.load.spritesheet(object.properties.sprite, '/assets/' + object.properties.sprite.replace(/(\.\.\/)+/, ''), object.width, object.height);
    });
  },
  getSpritesFromTilemap: function getSpritesFromTilemap(tilemap) {
    var objectsBySpriteMap = tilemap.data.layers.reduce(function (objectsBySprite, layer) {
      if (layer.objects) {
        layer.objects.forEach(function (object) {
          if (object.properties && object.properties.sprite && !objectsBySprite[object.properties.sprite]) {
            objectsBySprite[object.properties.sprite] = object;
          }
        });
      }
      return objectsBySprite;
    }, {});
    return Object.keys(objectsBySpriteMap).map(function (key) {
      return objectsBySpriteMap[key];
    });
  },
  createTilemap: function createTilemap(name) {
    var map = this.game.add.tilemap(name);
    this.tilemap.data.tilesets.forEach(function (set) {
      map.addTilesetImage(set.name, set.name, set.tilewidth, set.tileheight);
    });

    return map;
  },
  initiateTiledObjectGroups: function initiateTiledObjectGroups(map) {
    var _this3 = this;

    // TODO need more data about objects/entities in tiled and corresponding
    // classes in game code to handle this automagically
    // see TiledLevelState.create for manual implementation
    var groups = {};
    var objectsByType = this.arrangeObjectsByType(map.objects);
    Object.keys(objectsByType).forEach(function (type) {
      groups[type] = _this3.game.add.group();
      groups[type].enableBody = true;
      objectsByType[type].forEach(function (item) {
        return _this3.createSpriteFromTiledObject(item, groups[type]);
      });
    });
    return groups;
  },
  arrangeObjectsByType: function arrangeObjectsByType(objects) {
    return objects.reduce(function (objects, object) {
      if (object.type) {
        if (!objects[object.type]) {
          objects[object.type] = [];
        }
        objects[object.type].push(object);
      } else {
        console.warn('object found without type', object.name, object);
      }
      return objects;
    }, {});
  },
  getObjectsFromTilemap: function getObjectsFromTilemap(tilemap) {
    return tilemap.data.layers.reduce(function (objects, layer) {
      if (layer.objects) {
        objects = objects.concat(layer.objects);
      }
      return objects;
    }, []);
  },
  getTilemapObjectsByType: function getTilemapObjectsByType(tilemap) {
    return this.arrangeObjectsByType(this.getObjectsFromTilemap(tilemap));
  },

  /**
   * Creates a Phaser sprite in a sprite group from a Tiled object
   * @param  {object} object The Tiled object
   * @param  {group} group   The Phaser sprite group
   * @return {Sprite}        The Phaser sprite
   */
  createSpriteFromTiledObject: function createSpriteFromTiledObject(object, group) {
    if (!object.properties || !object.properties.sprite) {
      console.error('no sprite defined for object', object);
      return;
    }
    var sprite = group.create(object.x, object.y - object.height, object.properties.sprite);
    sprite.gameData = {
      name: object.name,
      type: object.type
    };
    Object.assign(sprite.gameData, object.properties);
    return sprite;
  }
};

export default TiledInterpreter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2VuZ2luZS9UaWxlZEludGVycHJldGVyLmpzIl0sIm5hbWVzIjpbIlRpbGVkSW50ZXJwcmV0ZXIiLCJwcmVsb2FkVGlsZW1hcCIsIm5hbWUiLCJqc29uTG9jYXRpb24iLCJsb2FkIiwib25GaWxlQ29tcGxldGUiLCJhZGQiLCJwcm9ncmVzcyIsImtleSIsInByZWxvYWRUaWxlbWFwQXNzZXRzIiwidGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiY2FjaGUiLCJnZXRUaWxlbWFwRGF0YSIsImRhdGEiLCJ0aWxlc2V0cyIsImZvckVhY2giLCJpbWFnZSIsInNldCIsInJlcGxhY2UiLCJnZXRTcHJpdGVzRnJvbVRpbGVtYXAiLCJzcHJpdGVzaGVldCIsIm9iamVjdCIsInByb3BlcnRpZXMiLCJzcHJpdGUiLCJ3aWR0aCIsImhlaWdodCIsIm9iamVjdHNCeVNwcml0ZU1hcCIsImxheWVycyIsInJlZHVjZSIsIm9iamVjdHNCeVNwcml0ZSIsImxheWVyIiwib2JqZWN0cyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJjcmVhdGVUaWxlbWFwIiwiZ2FtZSIsImFkZFRpbGVzZXRJbWFnZSIsInRpbGV3aWR0aCIsInRpbGVoZWlnaHQiLCJpbml0aWF0ZVRpbGVkT2JqZWN0R3JvdXBzIiwiZ3JvdXBzIiwib2JqZWN0c0J5VHlwZSIsImFycmFuZ2VPYmplY3RzQnlUeXBlIiwidHlwZSIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdCIsIml0ZW0iLCJwdXNoIiwiY29uc29sZSIsIndhcm4iLCJnZXRPYmplY3RzRnJvbVRpbGVtYXAiLCJjb25jYXQiLCJnZXRUaWxlbWFwT2JqZWN0c0J5VHlwZSIsImVycm9yIiwiY3JlYXRlIiwieCIsInkiLCJnYW1lRGF0YSIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFJQSxJQUFNQSxtQkFBbUI7QUFDdkJDLGdCQUR1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ZXZCLE1BQU1DLE9BQXJCLENBQVY7QUFDRDtBQUNELGFBQU9BLE9BQVA7QUFDRCxLQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQsR0FyRnNCO0FBc0Z2QnVCLHlCQXRGdUIsbUNBc0ZDL0MsT0F0RkQsRUFzRlU7QUFDL0IsV0FBTyxLQUFLb0Msb0JBQUwsQ0FBMEIsS0FBS1MscUJBQUwsQ0FBMkI3QyxPQUEzQixDQUExQixDQUFQO0FBQ0QsR0F4RnNCOztBQXlGdkI7Ozs7OztBQU1Bd0MsNkJBL0Z1Qix1Q0ErRksxQixNQS9GTCxFQStGYXdCLEtBL0ZiLEVBK0ZvQjtBQUN6QyxRQUFJLENBQUN4QixPQUFPQyxVQUFSLElBQXNCLENBQUNELE9BQU9DLFVBQVAsQ0FBa0JDLE1BQTdDLEVBQXFEO0FBQ25EMkIsY0FBUUssS0FBUixDQUFjLDhCQUFkLEVBQThDbEMsTUFBOUM7QUFDQTtBQUNEO0FBQ0QsUUFBTUUsU0FBU3NCLE1BQU1XLE1BQU4sQ0FBYW5DLE9BQU9vQyxDQUFwQixFQUF1QnBDLE9BQU9xQyxDQUFQLEdBQVdyQyxPQUFPSSxNQUF6QyxFQUFpREosT0FBT0MsVUFBUCxDQUFrQkMsTUFBbkUsQ0FBZjtBQUNBQSxXQUFPb0MsUUFBUCxHQUFrQjtBQUNoQjVELFlBQU1zQixPQUFPdEIsSUFERztBQUVoQjZDLFlBQU12QixPQUFPdUI7QUFGRyxLQUFsQjtBQUlBWixXQUFPNEIsTUFBUCxDQUFjckMsT0FBT29DLFFBQXJCLEVBQStCdEMsT0FBT0MsVUFBdEM7QUFDQSxXQUFPQyxNQUFQO0FBQ0Q7QUEzR3NCLENBQXpCOztBQThHQSxlQUFlMUIsZ0JBQWYiLCJmaWxlIjoiVGlsZWRJbnRlcnByZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTWV0aG9kcyBmb3IgaW50ZXJwcmV0aW5nIFRpbGVkIG1hcCBkYXRhIGludG8gdGhlIGdhbWVcbiAqIGludGVuZGVkIHRvIGV4dGVuZCBQaGFzZXIuU3RhdGVcbiAqL1xuY29uc3QgVGlsZWRJbnRlcnByZXRlciA9IHtcbiAgcHJlbG9hZFRpbGVtYXAobmFtZSwganNvbkxvY2F0aW9uKSB7XG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCgocHJvZ3Jlc3MsIGtleSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gbmFtZSkge1xuICAgICAgICB0aGlzLnByZWxvYWRUaWxlbWFwQXNzZXRzKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubG9hZC50aWxlbWFwKG5hbWUsIGpzb25Mb2NhdGlvbiwgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gIH0sXG4gIHByZWxvYWRUaWxlbWFwQXNzZXRzKG5hbWUpIHtcbiAgICB0aGlzLnRpbGVtYXAgPSB0aGlzLmNhY2hlLmdldFRpbGVtYXBEYXRhKG5hbWUpO1xuICAgIC8vIGxvYWQgdGlsZXNldCBpbWFnZXNcbiAgICB0aGlzLnRpbGVtYXAuZGF0YS50aWxlc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICAvLyBUT0RPIHRoaXMgaXMgYmFzZWQgb24gdGhlIHJlbGF0aXZlIHBhdGhzIGFsbCBiZWluZyB0byB0aGUgYXNzZXRzIGZvbGRlciBvciBzb21ldGhpbmdcbiAgICAgIHRoaXMubG9hZC5pbWFnZShzZXQubmFtZSwgYC9hc3NldHMvJHtzZXQuaW1hZ2UucmVwbGFjZSgvKFxcLlxcLlxcLykrLywgJycpfWApO1xuICAgIH0pO1xuICAgIC8vIGxvYWQgb2JqZWN0IHNwcml0ZXNcbiAgICB0aGlzLmdldFNwcml0ZXNGcm9tVGlsZW1hcCh0aGlzLnRpbGVtYXApLmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldChcbiAgICAgICAgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlLFxuICAgICAgICBgL2Fzc2V0cy8ke29iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZS5yZXBsYWNlKC8oXFwuXFwuXFwvKSsvLCAnJyl9YCxcbiAgICAgICAgb2JqZWN0LndpZHRoLFxuICAgICAgICBvYmplY3QuaGVpZ2h0XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBnZXRTcHJpdGVzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIGNvbnN0IG9iamVjdHNCeVNwcml0ZU1hcCA9IHRpbGVtYXAuZGF0YS5sYXllcnMucmVkdWNlKChvYmplY3RzQnlTcHJpdGUsIGxheWVyKSA9PiB7XG4gICAgICBpZiAobGF5ZXIub2JqZWN0cykge1xuICAgICAgICBsYXllci5vYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgICAgICBpZiAob2JqZWN0LnByb3BlcnRpZXMgJiYgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlICYmICFvYmplY3RzQnlTcHJpdGVbb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlXSkge1xuICAgICAgICAgICAgb2JqZWN0c0J5U3ByaXRlW29iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZV0gPSBvYmplY3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzQnlTcHJpdGU7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RzQnlTcHJpdGVNYXApLm1hcChrZXkgPT4gb2JqZWN0c0J5U3ByaXRlTWFwW2tleV0pO1xuICB9LFxuICBjcmVhdGVUaWxlbWFwKG5hbWUpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAobmFtZSk7XG4gICAgdGhpcy50aWxlbWFwLmRhdGEudGlsZXNldHMuZm9yRWFjaChzZXQgPT4ge1xuICAgICAgbWFwLmFkZFRpbGVzZXRJbWFnZShcbiAgICAgICAgc2V0Lm5hbWUsXG4gICAgICAgIHNldC5uYW1lLFxuICAgICAgICBzZXQudGlsZXdpZHRoLFxuICAgICAgICBzZXQudGlsZWhlaWdodFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXA7XG4gIH0sXG4gIGluaXRpYXRlVGlsZWRPYmplY3RHcm91cHMobWFwKSB7XG4gICAgLy8gVE9ETyBuZWVkIG1vcmUgZGF0YSBhYm91dCBvYmplY3RzL2VudGl0aWVzIGluIHRpbGVkIGFuZCBjb3JyZXNwb25kaW5nXG4gICAgLy8gY2xhc3NlcyBpbiBnYW1lIGNvZGUgdG8gaGFuZGxlIHRoaXMgYXV0b21hZ2ljYWxseVxuICAgIC8vIHNlZSBUaWxlZExldmVsU3RhdGUuY3JlYXRlIGZvciBtYW51YWwgaW1wbGVtZW50YXRpb25cbiAgICBjb25zdCBncm91cHMgPSB7fTtcbiAgICBjb25zdCBvYmplY3RzQnlUeXBlID0gdGhpcy5hcnJhbmdlT2JqZWN0c0J5VHlwZShtYXAub2JqZWN0cyk7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0c0J5VHlwZSkuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgIGdyb3Vwc1t0eXBlXSA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgIGdyb3Vwc1t0eXBlXS5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIG9iamVjdHNCeVR5cGVbdHlwZV0uZm9yRWFjaChpdGVtID0+IHRoaXMuY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KGl0ZW0sIGdyb3Vwc1t0eXBlXSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cHM7XG4gIH0sXG4gIGFycmFuZ2VPYmplY3RzQnlUeXBlKG9iamVjdHMpIHtcbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKG9iamVjdHMsIG9iamVjdCkgPT4ge1xuICAgICAgaWYgKG9iamVjdC50eXBlKSB7XG4gICAgICAgIGlmICghb2JqZWN0c1tvYmplY3QudHlwZV0pIHtcbiAgICAgICAgICBvYmplY3RzW29iamVjdC50eXBlXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdHNbb2JqZWN0LnR5cGVdLnB1c2gob2JqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybignb2JqZWN0IGZvdW5kIHdpdGhvdXQgdHlwZScsIG9iamVjdC5uYW1lLCBvYmplY3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgfSwge30pO1xuICB9LFxuICBnZXRPYmplY3RzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIHJldHVybiB0aWxlbWFwLmRhdGEubGF5ZXJzLnJlZHVjZSgob2JqZWN0cywgbGF5ZXIpID0+IHtcbiAgICAgIGlmIChsYXllci5vYmplY3RzKSB7XG4gICAgICAgIG9iamVjdHMgPSBvYmplY3RzLmNvbmNhdChsYXllci5vYmplY3RzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzO1xuICAgIH0sIFtdKTtcbiAgfSxcbiAgZ2V0VGlsZW1hcE9iamVjdHNCeVR5cGUodGlsZW1hcCkge1xuICAgIHJldHVybiB0aGlzLmFycmFuZ2VPYmplY3RzQnlUeXBlKHRoaXMuZ2V0T2JqZWN0c0Zyb21UaWxlbWFwKHRpbGVtYXApKTtcbiAgfSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBQaGFzZXIgc3ByaXRlIGluIGEgc3ByaXRlIGdyb3VwIGZyb20gYSBUaWxlZCBvYmplY3RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvYmplY3QgVGhlIFRpbGVkIG9iamVjdFxuICAgKiBAcGFyYW0gIHtncm91cH0gZ3JvdXAgICBUaGUgUGhhc2VyIHNwcml0ZSBncm91cFxuICAgKiBAcmV0dXJuIHtTcHJpdGV9ICAgICAgICBUaGUgUGhhc2VyIHNwcml0ZVxuICAgKi9cbiAgY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KG9iamVjdCwgZ3JvdXApIHtcbiAgICBpZiAoIW9iamVjdC5wcm9wZXJ0aWVzIHx8ICFvYmplY3QucHJvcGVydGllcy5zcHJpdGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ25vIHNwcml0ZSBkZWZpbmVkIGZvciBvYmplY3QnLCBvYmplY3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzcHJpdGUgPSBncm91cC5jcmVhdGUob2JqZWN0LngsIG9iamVjdC55IC0gb2JqZWN0LmhlaWdodCwgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlKTtcbiAgICBzcHJpdGUuZ2FtZURhdGEgPSB7XG4gICAgICBuYW1lOiBvYmplY3QubmFtZSxcbiAgICAgIHR5cGU6IG9iamVjdC50eXBlXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHNwcml0ZS5nYW1lRGF0YSwgb2JqZWN0LnByb3BlcnRpZXMpO1xuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVkSW50ZXJwcmV0ZXI7XG4iXX0=