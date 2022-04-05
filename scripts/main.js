import GameScene from './scenes/GameScene.js'
import GameOverScene from './scenes/GameOverScene.js'
import StageClearScene from './scenes/StageClearScene.js'

let gameScene = new GameScene();
let gameOverScene = new GameOverScene();
let stageClearScene = new StageClearScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 492,
    backgroundColor: "#D8F2FF",
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
game.scene.add('GameOverScene', gameOverScene);
game.scene.add('StageClearScene', stageClearScene);

game.scene.start('GameScene');
