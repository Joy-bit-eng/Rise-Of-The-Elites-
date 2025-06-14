export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Load your assets here, e.g.:
    // this.load.image('player', 'sprites/player.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
