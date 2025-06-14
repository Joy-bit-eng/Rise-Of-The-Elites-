export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('🔁 Preloading assets...');

    // Show loading progress
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      fontSize: '20px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      console.log('✅ Assets loaded.');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load tilemap and tileset
    this.load.image('tiles', 'assets/tileset.png');
    this.load.tilemapTiledJSON('world', 'assets/map.json');

    // Player sprite
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // Elite sample
    this.load.spritesheet('elite001', 'assets/elites/elite001.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // Icons
    this.load.image('ui_icons', 'assets/ui_icons.png');
    this.load.image('gear', 'assets/gear.png');
    this.load.image('items', 'assets/items.png');

    // Backgrounds, buttons, etc. (optional)
    this.load.image('battle_bg', 'assets/battle_background.png');
    this.load.image('button', 'assets/button.png');
  }

  create() {
    // Start the next scene
    this.scene.start('GameScene');
  }
}
