var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 492,
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
    this.load.image('tiles', './assets/maps/sheet.png')
    this.load.tilemapTiledJSON('tilemap', './assets/maps/map.tmj')

    this.load.image('coin', './assets/sprites/coin.png');
    this.load.spritesheet('dude', './assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

var player;
var coins;
var cursors;
var coinsScore = 0;

function create(){

    // Map
    const map = this.make.tilemap({key: 'tilemap'})
    const tileset = map.addTilesetImage('tiles_packed', 'tiles');
    const platform = map.createLayer('platform', tileset, 0, 60);
    const water = map.createLayer('water', tileset, 0, 60);

    map.createLayer('backdrops-extra', tileset, 0, 60)
    map.createLayer('backdrops', tileset, 0, 60)
    map.createLayer('extra details', tileset, 0, 60)
    const CoinLayer = map.getObjectLayer('coins')['objects'];

    platform.setCollisionByExclusion(-1, true);
    water.setCollisionByExclusion(-1, true);

    // Coins
    coins = this.physics.add.staticGroup()
    CoinLayer.forEach(object => {
    let obj = coins.create(object.x, object.y, "coin"); 
       obj.setScale(object.width/16, object.height/16); 
       obj.setOrigin(0); 
       obj.body.width = object.width; 
       obj.body.height = object.height;}
    )

    // Player
    player = this.physics.add.sprite(200, 350, 'dude');

    player.setCollideWorldBounds(false);

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

    // Texts
    coinText = this.add.text(100, 10, `Coins: ${coinsScore}x`, {
        fontSize: '20px',
        fill: '#000000'
      });
    coinText.setScrollFactor(0);
    

    // Physics and Camera
    this.physics.add.collider(player, platform);
    this.physics.add.collider(player, water);
    this.physics.add.overlap(player, coins, collectCoins, null, this)

    this.cameras.main
    .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    .startFollow(player);
}

function update(){
    cursors = this.input.keyboard.createCursorKeys();

    const speed = 150;

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

function collectCoins(player, coins){
    coins.destroy(coins.x, coins.y)
    coinsScore ++;
    coinText.setText(`Coins: ${coinsScore}x`);
    return false; 
}