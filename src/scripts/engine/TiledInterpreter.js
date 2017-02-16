/**
 * Methods for interpreting Tiled map data into the game
 * intended to extend Phaser.State
 */
const TiledInterpreter = {
  preloadTilemap(name, jsonLocation) {
    this.load.onFileComplete.add((progress, key) => {
      if (key === name) {
        this.preloadTilemapAssets(name);
      }
    });
    this.load.tilemap(name, jsonLocation, null, Phaser.Tilemap.TILED_JSON);
  },
  preloadTilemapAssets(name) {
    this.tilemap = this.cache.getTilemapData(name);
    // load tileset images
    this.tilemap.data.tilesets.forEach(set => {
      // TODO fix this set.image.replace regex hack, this is essentially hard coded
      this.load.image(set.name, `assets/${set.image.replace(/(\.\.\/)+/, '')}`);
    });
    // load object sprites
    this.getSpritesFromTilemap(this.tilemap).forEach(object => {
      this.load.spritesheet(
        object.properties.sprite,
        `assets/${object.properties.sprite.replace(/(\.\.\/)+/, '')}`,
        object.width,
        object.height
      );
    });
  },
  getSpritesFromTilemap(tilemap) {
    const objectsBySpriteMap = tilemap.data.layers.reduce((objectsBySprite, layer) => {
      if (layer.objects) {
        layer.objects.forEach(object => {
          if (object.properties && object.properties.sprite && !objectsBySprite[object.properties.sprite]) {
            objectsBySprite[object.properties.sprite] = object;
          }
        });
      }
      return objectsBySprite;
    }, {});
    return Object.keys(objectsBySpriteMap).map(key => objectsBySpriteMap[key]);
  },
  createTilemap(name) {
    const map = this.game.add.tilemap(name);
    this.tilemap.data.tilesets.forEach(set => {
      map.addTilesetImage(
        set.name,
        set.name,
        set.tilewidth,
        set.tileheight
      );
    });

    return map;
  },
  initiateTiledObjectGroups(map) {
    // TODO need more data about objects/entities in tiled in order to do this
    const groups = {};
    const objectsByType = this.arrangeObjectsByType(map.objects);
    Object.keys(objectsByType).forEach(type => {
      groups[type] = this.game.add.group();
      groups[type].enableBody = true;
      objectsByType[type].forEach(item => this.createSpriteFromTiledObject(item, groups[type]));
    });
    return groups;
  },
  arrangeObjectsByType(objects) {
    return objects.reduce((objects, object) => {
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
  getObjectsFromTilemap(tilemap) {
    return tilemap.data.layers.reduce((objects, layer) => {
      if (layer.objects) {
        objects = objects.concat(layer.objects);
      }
      return objects;
    }, []);
  },
  /**
   * Creates a Phaser sprite in a sprite group from a Tiled object
   * @param  {object} object The Tiled object
   * @param  {group} group   The Phaser sprite group
   * @return {Sprite}        The Phaser sprite
   */
  createSpriteFromTiledObject(object, group) {
    if (!object.properties || !object.properties.sprite) {
      console.error('no sprite defined for object', object);
      return;
    }
    const sprite = group.create(object.x, object.y - object.height, object.properties.sprite);
    sprite.gameData = {
      name: object.name,
      type: object.type
    };
    Object.assign(sprite.gameData, object.properties);
    return sprite;
  }
};

export default TiledInterpreter;
