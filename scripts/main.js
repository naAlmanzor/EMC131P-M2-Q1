import GameScene from './scenes/GameScene.js'

let gameScene = new GameScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 492,
    backgroundColor: "#D8F2FF",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },  
};

let game = new Phaser.Game(config);

game.scene.add('GameScene', gameScene);

game.scene.start('GameScene');
