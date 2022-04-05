export default class StageClearScene extends Phaser.Scene{

    constructor(){
        super("StageClearScene")
    }

    preload(){
        this.load.image('restart', './assets/icons/restart-icon.png');
        this.load.image('home', './assets/icons/home-icon.png');
    }

    create(){
        let text = this.add.text(250, 150, `STAGE CLEAR`, {
            fontFamily:'Montserrat',
            fontSize: '50px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        text.setScrollFactor(0);

        let restartBtn = this.add.sprite(340, 270, 'restart');
        restartBtn.setScale(0.8);
        restartBtn.setInteractive({useHandCursor: true});
        restartBtn.on('pointerdown', () => this.restart());

        let homeBtn = this.add.sprite(480, 270, 'home');
        homeBtn.setScale(0.8);

        this.cameras.main.setBackgroundColor('#FFD700')
    }

    restart(){
        this.scene.start("GameScene");
    }
}