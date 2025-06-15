export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Tileset and map
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/world.json');

    // Player sprite
    this.load.spritesheet('player', 'sprites/player.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // UI & item sprites
    this.load.image('ui_icons', 'sprites/ui_icons.png');
    this.load.image('items', 'sprites/items.png');
    this.load.image('npc', 'sprites/npc.png');
    this.load.image('gear', 'sprites/gear.png');

    // Audio
    this.load.audio('bgmusic', 'assets/audio/bgmusic.mp3');
    this.load.audio('battle', 'assets/audio/battle.mp3');
    this.load.audio('catch', 'assets/audio/catch.wav');
    this.load.audio('click', 'assets/audio/click.wav');
    this.load.audio('fusion', 'assets/audio/fusion.wav');

    // Data
    this.load.json('elitesData', 'data/elites.json');
    this.load.json('itemsData', 'data/items.json');
    this.load.json('missionsData', 'data/missions.json');
  }

  create() {
    this.scene.start('GameScene');
  }
}
