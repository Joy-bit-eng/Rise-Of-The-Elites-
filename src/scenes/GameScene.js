export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Load tilemap
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset', 'tiles'); // 'tileset' must match the name in Tiled

    // Create layers
    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const aboveLayer = map.createLayer('Above', tileset, 0, 0);
    aboveLayer.setDepth(10);

    // Add player sprite
    this.player = this.physics.add.sprite(100, 100, 'player', 0);
    this.player.setCollideWorldBounds(true);

    // Set camera to follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Simple input handling
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 150;
    const player = this.player;

    player.setVelocity(0);

    if (this.cursors.left.isDown) {
      player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      player.setVelocityY(speed);
    }
  }
}
