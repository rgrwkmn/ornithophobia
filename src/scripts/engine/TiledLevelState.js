import TiledInterpreter from './TiledInterpreter';
import {
  collect, consume, knockDoor, knockGate
} from './interactions';

/**
 * Extend this instead of Phaser.State to handle a Tiled level
 * @type {Object}
 */
class TiledLevelState extends Phaser.State {
  init({ mapPath }) {
    this.tiledLevel = {
      mapPath,
      mapName: mapPath
    };

    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  }
  preload() {
    const { mapName, mapPath } = this.tiledLevel;
    this.preloadTilemap(mapName, mapPath, null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('player', '/assets/sprites/player.png', 16, 16);
  }
  create() {
    const { mapName } = this.tiledLevel;
    this.game.stage.backgroundColor = '#000';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // have the game centered on screen
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.map = this.createTilemap(mapName);

    this.tiledLevel.mapLayers = [];
    this.tiledLevel.collideLayers = [];

    this.map.layers.forEach(layer => {
      const createdLayer = this.map.createLayer(layer.name);
      createdLayer.resizeWorld();
      this.tiledLevel.mapLayers.push(createdLayer);
      if (layer.properties.impassable) {
        this.tiledLevel.collideLayers.push(createdLayer);
        this.map.setCollisionByExclusion([], true, createdLayer);
      }
    });

    const objectsByType = this.getTilemapObjectsByType(this.tilemap);

    if (objectsByType.Consumable) {
      this.tiledLevel.consumables = this.game.add.group();
      this.tiledLevel.consumables.enableBody = true;
      const consumables = objectsByType.Consumable;
      consumables.forEach(item =>
        this.createSpriteFromTiledObject(item, this.tiledLevel.consumables)
      );
    }

    if (objectsByType.Key) {
      this.tiledLevel.keys = this.game.add.group();
      this.tiledLevel.keys.enableBody = true;
      const keys = objectsByType.Key;
      keys.forEach(item =>
        this.createSpriteFromTiledObject(item, this.tiledLevel.keys)
      );
    }

    if (objectsByType.Door) {
      this.tiledLevel.doors = this.game.add.group();
      this.tiledLevel.doors.enableBody = true;
      const doors = objectsByType.Door;
      doors.forEach(item => {
        const sprite = this.createSpriteFromTiledObject(item, this.tiledLevel.doors);
        sprite.body.moves = false;
      });
    }

    if (objectsByType.Gate) {
      this.tiledLevel.gates = this.game.add.group();
      this.tiledLevel.gates.enableBody = true;
      const gates = objectsByType.Gate;
      gates.forEach(item => {
        const sprite = this.createSpriteFromTiledObject(item, this.tiledLevel.gates);
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
  }
  update() {
    this.tiledLevel.collideLayers.forEach(layer => {
      this.game.physics.arcade.collide(this.player, layer);
    });
    this.game.physics.arcade.overlap(this.player, this.tiledLevel.consumables, consume, null, this);
    this.game.physics.arcade.overlap(this.player, this.tiledLevel.keys, collect, null, this);
    this.game.physics.arcade.collide(this.player, this.tiledLevel.doors, knockDoor, null, this);
    this.game.physics.arcade.collide(this.player, this.tiledLevel.gates, knockGate, null, this);
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

Object.assign(TiledLevelState.prototype, TiledInterpreter);
export default TiledLevelState;
