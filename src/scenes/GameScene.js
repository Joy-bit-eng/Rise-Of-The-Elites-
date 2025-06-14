export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'world' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    map.createLayer('Ground', tileset);
    map.createLayer('Props', tileset);

    this.player = this.physics.add.sprite(100, 100, 'player', 0);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 150;
    const { left, right, up, down } = this.cursors;
    this.player.setVelocity(0);

    if (left.isDown) this.player.setVelocityX(-speed);
    else if (right.isDown) this.player.setVelocityX(speed);

    if (up.isDown) this.player.setVelocityY(-speed);
    else if (down.isDown) this.player.setVelocityY(speed);
  }
}
