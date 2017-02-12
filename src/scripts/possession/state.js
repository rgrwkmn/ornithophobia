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

class State extends Phaser.State {
  preload() {
    this.load.tilemap('level1', 'assets/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/simples_pimples.png');
    this.load.spritesheet('skull-key', 'assets/skull-key.png', 16, 16);
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

    console.log('map', this.map);
    this.map.addTilesetImage(
      'simples_pimples', // this.map.tilesets[0].name for some reason
      'gameTiles', 16, 16
    );

    this.mapLayers = [];
    this.collideLayers = [];

    this.map.layers.forEach(layer => {
      console.log(layer.name, layer);
      const createdLayer = this.map.createLayer(layer.name);
      createdLayer.resizeWorld();
      this.mapLayers.push(createdLayer);
      if (layer.properties.wall) {
        this.collideLayers.push(createdLayer);
        console.log('setCollisionBetween', createdLayer);
        // this.map.setCollisionBetween(1, layer.data.length * layer.data[0].length, true, layer.name);
        this.map.setCollisionByExclusion([], true, createdLayer);
      }
    });

    console.log(this.map.objects);
    this.items = this.game.add.group();
    this.items.enableBody = true;
    const items = findObjectsByType('item', this.map);
    items.forEach(item => createSpriteFromTiledObject(item, this.items));

    // this.mapLayers[1].resizeWorld();

    this.physics.startSystem(Phaser.Physics.ARCADE);

    // add player
    const playerStart = findObjectsByType('playerStart', this.map)[0];
    this.player = this.add.sprite(playerStart.x, playerStart.y, 'player');
    this.player.scale.setTo(0.5, 0.5);
    this.physics.arcade.enable(this.player);
    this.player.animations.add('left', [ 0, 1, 2, 3 ], 10, true);
    this.player.animations.add('right', [ 5, 6, 7, 8 ], 10, true);
    this.game.camera.follow(this.player);

    console.log(this.map);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  update() {
    this.collideLayers.forEach(layer => {
      this.game.physics.arcade.collide(this.player, layer);
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
}

export default State;
