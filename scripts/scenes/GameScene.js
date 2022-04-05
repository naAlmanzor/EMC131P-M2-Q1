export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    init(){
        this.player;
        this.coins;
        this.cursors;
        this.coinsScore = 0;
        this.coinCounter = 0;
        this.score = 0;
        this.pMobs;
        this.gEnemies;
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheet.png')
        this.load.tilemapTiledJSON('tilemap', './assets/maps/map.tmj')
    
        this.load.image('coin', './assets/images/coin.png');
        this.load.image('push-mobs', './assets/images/push-mobs.png')
        this.load.image('ground-enemies', './assets/images/ground-enemies.png')
        this.load.spritesheet('dude', './assets/images/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    
    create(){
    
        // Map
        this.map = this.make.tilemap({key: 'tilemap'})
        this.tileset = this.map.addTilesetImage('tiles_packed', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 60);
        this.water = this.map.createLayer('water', this.tileset, 0, 60);
    
        this.map.createLayer('backdrops-extra', this.tileset, 0, 60)
        this.map.createLayer('backdrops', this.tileset, 0, 60)
        this.map.createLayer('extra details', this.tileset, 0, 60)
    
    
        this.platform.setCollisionByExclusion(-1, true);
        this.water.setCollisionByExclusion(-1, true);
    
        // Coins
        this.CoinLayer = this.map.getObjectLayer('coins')['objects'];
        
        this.coins = this.physics.add.staticGroup()
        this.CoinLayer.forEach(object => {
            let obj = this.coins.create(object.x, object.y, "coin"); 
            obj.setScale(object.width/18, object.height/18); 
            obj.setOrigin(0.5, 0.5); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
        // Enemies
        this.enemyGround = this.map.getObjectLayer('ground enemies')['objects'];
    
        this.gEnemies = this.physics.add.group();
        this.enemyGround.forEach(object => {
            let obj = this.gEnemies.create(object.x, object.y, "ground-enemies");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
        
        this.pushMobs = this.map.getObjectLayer('push mobs')['objects'];
        
        this.pMobs = this.physics.add.group();
        this.pushMobs.forEach(object => {
            let obj = this.pMobs.create(object.x, object.y, "push-mobs");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
        // Player
        this.player = this.physics.add.sprite(200, 350, 'dude');
    
        this.player.setCollideWorldBounds(false);
    
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
        this.coinText = this.add.text(180, 10, `Coins: ${this.coinsScore}x`, {
            fontSize: '20px',
            fill: '#000000'
          });
        this.coinText.setScrollFactor(0);
    
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#000000'
        });
        this.scoreText.setScrollFactor(0);
        
    
        // Physics and Camera
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.water);
        this.physics.add.collider(this.player, this.pMobs);
        this.physics.add.collider(this.pMobs, this.platform);
        this.physics.add.collider(this.gEnemies, this.platform);
        this.physics.add.collider(this.pMobs, this.gEnemies, this.hitBlock, null, this);
        this.physics.add.collider(this.player, this.gEnemies, this.hitMob, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this)
    
        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;
    
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
        }
    
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
    
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }   
    
        if (this.cursors.up.isDown && (this.player.body.touching.down || this.player.body.onFloor())){
            this.player.setVelocityY(-380);
        }
    }
    
    collectCoins(player, coins){
        coins.destroy(coins.x, coins.y)
        this.coinsScore ++;
        this.coinText.setText(`Coins: ${this.coinsScore}x`);
        
        this.coinCounter += 1
    
        if(this.coinCounter==10){
            this.score+=500;
            this.scoreText.setText(`Score: ${this.score}`);
            this.coinCounter=0;
        }
    
        if(this.coinsScore==21){
            this.score+=1000
            this.scoreText.setText(`Score: ${this.score}`);
        }
    
        return false; 
    }
    
    hitMob (player, gEnemies)
    {
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play('turn');
    }
    
    hitBlock (pMobs, gEnemies){
        
        pMobs.setVelocityX(100)
        gEnemies.destroy(gEnemies.x, gEnemies.y)
        this.score+=100;
        this.scoreText.setText(`Score: ${this.score}`);
        return false;
    
    }

}
