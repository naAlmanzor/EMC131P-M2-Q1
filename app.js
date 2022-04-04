var config = {
    type: Phaser.AUTO,
    width: 1152,
    height: 360,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload(){
    this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 32, frameHeight: 48})
    this.load.image('tiles', 'assets/maps/sheet.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/maps/map.tmj')
}

var player;

function create(){
    
    const map = this.make.tilemap({key: 'tilemap'})
    const tileset = map.addTilesetImage('tiles_packed', 'tiles');

    const platform = map.createLayer('platform', tileset);

    platform.setCollisionByProperty({collides: true})

    this.matter.world.convertTilemapLayer(platform);

}

function update(){
}