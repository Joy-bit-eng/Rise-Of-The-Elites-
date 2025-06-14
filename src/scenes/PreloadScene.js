export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('world', 'assets/world.json');

    this.load.spritesheet('player', 'sprites/player.png', { frameWidth: 32, frameHeight: 32 });

    for (let i = 1; i <= 9; i++) {
      this.load.image(`elite${i}`, `sprites/elites/elite${i.toString().padStart(3, '0')}.png`);
    }
  }

  create() {
    this.scene.start('GameScene');
  }
}
