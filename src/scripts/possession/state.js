import { randomCoords } from 'ornithophobia/utilities';

function createBaddie(game) {
  const baddie = game.add.sprite(...randomCoords(game.world.width, game.world.height), 'baddie');
  baddie.animations.add('left', [ 0, 1 ], 10, true);
  baddie.animations.add('right', [ 2, 3 ], 10, true);
  return baddie;
}

class State extends Phaser.State {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('diamond', 'assets/diamond.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
  }
  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'sky');

    // add some the player can possess
    this.possessables = this.add.group();
    this.possessables.enableBody = true;

    Array(5).fill().forEach(() => {
      const baddie = createBaddie(this);
      this.possessables.add(baddie);
      baddie.body.collideWorldBounds = true;
    });

    // add player
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [ 0, 1, 2, 3 ], 10, true);
    this.player.animations.add('right', [ 5, 6, 7, 8 ], 10, true);
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.possessables);
    this.game.physics.arcade.collide(this.possessables, this.possessables);

    const cursors = this.game.input.keyboard.createCursorKeys();

    //  Reset the this.players velocity (movement)
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    this.possessables.forEach(possessable => {
      possessable.frame = 1;
    });

    switch (true) {
    case cursors.up.isDown:
      this.player.body.velocity.y = -150;
      break;
    case cursors.down.isDown:
      this.player.body.velocity.y = 150;
      break;
    }
    switch (true) {
    case cursors.left.isDown:
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
      break;
    case cursors.right.isDown:
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
      break;
    default:
      this.player.frame = 4;
    }
  }
}

export default State;
