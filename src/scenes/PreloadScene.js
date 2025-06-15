export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
  this.load.image('tiles', 'assets/tiles.png');
  this.load.tilemapTiledJSON('map', 'assets/world.json');
  this.load.spritesheet('player', 'sprites/player.png', {
    frameWidth: 32,
    frameHeight: 32
  });
  // Add any audio, items, NPCs, UI, etc.
  }
  

  create() {
    this.scene.start('GameScene');
  }
}
