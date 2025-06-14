export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.add.text(100, 100, 'Rise of the Elites!', {
      fontSize: '32px',
      fill: '#ffffff'
    });
  }
}
