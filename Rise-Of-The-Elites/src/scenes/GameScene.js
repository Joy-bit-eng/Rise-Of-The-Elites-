import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Background color
    this.cameras.main.setBackgroundColor('#1a1a1a');

    // Create tilemap (assuming it's preloaded)
    const map = this.make.tilemap({ key: 'world' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('Ground', tileset);
    const collisionLayer = map.createLayer('Collision', tileset);

    // Set collisions
    collisionLayer.setCollisionByProperty({ collides: true });

    // Create player
    this.player = this.physics.add.sprite(100, 100, 'player', 0);
    this.player.setCollideWorldBounds(true);

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Add collision
    this.physics.add.collider(this.player, collisionLayer);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add Elite for encounter (example)
    this.elite = this.physics.add.sprite(300, 100, 'elite001', 0);
    this.elite.setImmovable(true);
    this.physics.add.overlap(this.player, this.elite, this.triggerBattle, null, this);

    // Add UI text
    this.missionText = this.add.text(10, 10, 'Explore and find Elites!', {
      fontSize: '16px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setScrollFactor(0);
  }

  triggerBattle(player, elite) {
    this.scene.pause();
    this.scene.launch('BattleScene', { player, elite });
  }

  update() {
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}
