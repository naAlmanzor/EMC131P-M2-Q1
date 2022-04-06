import TitleScene from './scenes/TitleScene.js';
import InstructionScene from './scenes/InstructionScene.js';
import GameScene from './scenes/GameScene.js'
import GameOverScene from './scenes/GameOverScene.js'
import StageClearScene from './scenes/StageClearScene.js'

let titleScene = new TitleScene();
let instructionScene = new InstructionScene();
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

game.scene.add('TitleScene', titleScene);
game.scene.add('InstructionScene', instructionScene);
game.scene.add('GameScene', gameScene);
game.scene.add('GameOverScene', gameOverScene);
game.scene.add('StageClearScene', stageClearScene);

// Starting Scene
game.scene.start('TitleScene');
