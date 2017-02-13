const TILE_SIZE = 16;

function findObjectsByType(type, map) {
  var result = [];
  Object.keys(map.objects).forEach(key => {
    map.objects[key].forEach(element => {
      if(element.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
  });
  return result;
}

function arrangeObjectsByType(map) {
  return Object.keys(map.objects).reduce((objects, key) => {
    map.objects[key].forEach(object => {
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
  const sprite = group.create(element.x, element.y - TILE_SIZE, element.properties.sprite);
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
    console.warn(`door ${door.gameData.name} doesn't have no damn KEY`, door);
    return;
  }

  if (entity.inventory && entity.inventory.some(
    item => item.type === 'key' && item.id === door.gameData.key
  )) {
    door.destroy();
  } else {
    console.log('need some key for this door idiot');
  }
}

class State extends Phaser.State {
  preload() {
    this.load.tilemap('level1', 'assets/example.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/simples_pimples.png');
    this.load.spritesheet('skull-key', 'assets/skull-key.png', 16, 16);
    this.load.spritesheet('gold-door', 'assets/gold-door.png', 16, 16);
    this.load.spritesheet('turkey-leg', 'assets/turkey-leg.png', 16, 16);
    this.load.spritesheet('player', 'assets/dude.png', 32, 48);
  }
  create() {
    // loading screen will have a white background
    this.game.stage.backgroundColor = '#000';

    // scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.map = this.game.add.tilemap('level1');

    this.map.addTilesetImage(
      'simples_pimples', // this.map.tilesets[0].name for some reason
      'gameTiles', 16, 16
    );

    this.mapLayers = [];
    this.collideLayers = [];

    this.map.layers.forEach(layer => {
      const createdLayer = this.map.createLayer(layer.name);
      createdLayer.resizeWorld();
      this.mapLayers.push(createdLayer);
      if (layer.properties.impassable) {
        this.collideLayers.push(createdLayer);
        this.map.setCollisionByExclusion([], true, createdLayer);
      }
    });

    const objectsByType = arrangeObjectsByType(this.map);
    this.consumables = this.game.add.group();
    this.consumables.enableBody = true;
    const consumables = objectsByType.consumable;
    consumables.forEach(item => createSpriteFromTiledObject(item, this.consumables));

    this.keys = this.game.add.group();
    this.keys.enableBody = true;
    const keys = objectsByType.key;
    keys.forEach(item => createSpriteFromTiledObject(item, this.keys));

    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    const doors = objectsByType.door;
    doors.forEach(item => {
      const sprite = createSpriteFromTiledObject(item, this.doors);
      sprite.body.moves = false;
    });

    this.physics.startSystem(Phaser.Physics.ARCADE);

    // add player
    const playerStart = objectsByType.playerStart[0];
    this.player = this.add.sprite(playerStart.x, playerStart.y - TILE_SIZE, 'player');
    this.player.scale.setTo(0.5, 0.5);
    this.physics.arcade.enable(this.player);
    this.player.animations.add('left', [ 0, 1, 2, 3 ], 10, true);
    this.player.animations.add('right', [ 5, 6, 7, 8 ], 10, true);
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  update() {
    this.collideLayers.forEach(layer => {
      this.game.physics.arcade.collide(this.player, layer);
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
}

export default State;
