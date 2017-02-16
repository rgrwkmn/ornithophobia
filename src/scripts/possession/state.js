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
    console.warn(`door ${door.gameData.name} doesn't have no damn KEY`, door);
    return;
  }

  if (entity.inventory) {
    const item = entity.inventory.find(
      item => item.type === 'Key' && item.id === door.gameData.key
    );
    if (item) {
      door.destroy();
      console.log(`you used the ${item.displayName} key on the door and it opened`);
      return;
    }
  }
  console.log('need some key for this door idiot');
}

function gateCanOpen(gate) {
  return (
    gate.gameData.openDirection === 'north' && gate.body.touching.up
    || gate.gameData.openDirection === 'south' && gate.body.touching.down
    || gate.gameData.openDirection === 'west' && gate.body.touching.left
    || gate.gameData.openDirection === 'east' && gate.body.touching.right
  );
}

function knockGate(entity, gate) {
  if (!gate.gameData || !gate.gameData.openDirection) {
    console.warn(`gate ${gate.gameData.name} ain't got no openDirection`, gate);
    return;
  }
  if (gateCanOpen(gate)) {
    gate.destroy();
    console.log('the gate has a handle on this side, you opened it');
  } else {
    console.log('the gate does not open from this side');
  }
}

class State extends Phaser.State {
  init() {
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  }
  preload() {
    this.preloadTilemap('level1', 'assets/maps/larger.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('player', 'assets/sprites/player.png', 16, 16);
  }
  create() {
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

    this.map.layers.forEach(layer => {
      const createdLayer = this.map.createLayer(layer.name);
      createdLayer.resizeWorld();
      this.mapLayers.push(createdLayer);
      if (layer.properties.impassable) {
        this.collideLayers.push(createdLayer);
        this.map.setCollisionByExclusion([], true, createdLayer);
      }
    });

    const objectsByType = this.arrangeObjectsByType(this.getObjectsFromTilemap(this.tilemap));

    if (objectsByType.Consumable) {
      this.consumables = this.game.add.group();
      this.consumables.enableBody = true;
      const consumables = objectsByType.Consumable;
      consumables.forEach(item => this.createSpriteFromTiledObject(item, this.consumables));
    }

    if (objectsByType.Key) {
      this.keys = this.game.add.group();
      this.keys.enableBody = true;
      const keys = objectsByType.Key;
      keys.forEach(item => this.createSpriteFromTiledObject(item, this.keys));
    }

    if (objectsByType.Door) {
      this.doors = this.game.add.group();
      this.doors.enableBody = true;
      const doors = objectsByType.Door;
      doors.forEach(item => {
        const sprite = this.createSpriteFromTiledObject(item, this.doors);
        sprite.body.moves = false;
      });
    }

    if (objectsByType.Gate) {
      this.gates = this.game.add.group();
      this.gates.enableBody = true;
      const gates = objectsByType.Gate;
      gates.forEach(item => {
        const sprite = this.createSpriteFromTiledObject(item, this.gates);
        sprite.body.moves = false;
      });
    }

    this.physics.startSystem(Phaser.Physics.ARCADE);

    // add player
    const playerStart = objectsByType.PlayerStart[0];
    this.player = this.add.sprite(playerStart.x, playerStart.y - playerStart.height, 'player');
    this.physics.arcade.enable(this.player);
    this.player.animations.add('walk', [ 1, 2 ], 10, true);
    this.player.anchor.setTo(0.5, 1);
    this.player.body.setSize(10, 8, 3, 8);
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    console.log('you awaken in a rocky forest');
    console.log('there are pixels around you that should probably be transparent');
    console.log('you somehow know that in order to leave this place');
    console.log('you will have to unlock some doors...');
  }
  update() {
    this.collideLayers.forEach(layer => {
      this.game.physics.arcade.collide(this.player, layer);
    });
    this.game.physics.arcade.overlap(this.player, this.consumables, consume, null, this);
    this.game.physics.arcade.overlap(this.player, this.keys, collect, null, this);
    this.game.physics.arcade.collide(this.player, this.doors, knockDoor, null, this);
    this.game.physics.arcade.collide(this.player, this.gates, knockGate, null, this);
    //  Reset the this.players velocity (movement)
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    let direction = '';
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
}

export default Object.assign(State.prototype, TiledInterpreter);
