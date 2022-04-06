export default class StageClearScene extends Phaser.Scene{

    constructor(){
        super("StageClearScene")
    }

    create(){
        let text = this.add.text(250, 150, `STAGE CLEAR`, {
            fontFamily:'Montserrat',
            fontSize: '50px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        text.setScrollFactor(0);

        let restartTxt = this.add.text(300, 248, `RETRY STAGE`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        restartTxt.setScrollFactor(0);
        restartTxt.setInteractive({useHandCursor: true});
        restartTxt.on('pointerdown', () => this.restart());

        let titleTxt = this.add.text(300, 300, `TITLE SCREEN`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        titleTxt.setScrollFactor(0);
        titleTxt.setInteractive({useHandCursor: true});
        titleTxt.on('pointerdown', () => this.home());

        this.cameras.main.setBackgroundColor('#FFD700')
    }

    restart(){
        this.scene.start("GameScene");
    }

    home(){
        this.scene.start("TitleScene");
    }
}