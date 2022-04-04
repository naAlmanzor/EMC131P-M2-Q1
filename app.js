var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFAC",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
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
    this.load.image('tiles', 'assets/maps/sheet.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/maps/map.tmj')

    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
}


function create(){
    const map = this.make.tilemap({key: 'tilemap'})
    const tileset = map.addTilesetImage('tiles_packed', 'tiles');
    const platform = map.createLayer('platform', tileset, 0, 170);
    
    platform.setCollisionByExclusion(-1, true);

    player = this.physics.add.sprite(180, 500, 'dude').setScale(1);

    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider   (player, platform);

    this.cameras.main
    .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    .startFollow(player);
}

function update(){
    cursors = this.input.keyboard.createCursorKeys();

    const speed = 100;

    if (cursors.left.isDown){
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }

    else if (cursors.right.isDown){
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor()){
        player.setVelocityY(-350);
    }
}