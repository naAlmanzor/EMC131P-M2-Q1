export default class TitleScene extends Phaser.Scene{

    constructor(){
        super("TitleScene")
    }

    preload(){
        this.load.image('bg', './assets/images/title-bg.png');
    }

    create(){
        let bg = this.add.image(470,250,'bg')
        bg.setScale(0.6);

        let playText = this.add.text(220, 200, `PLAY GAME`, {
            fontFamily:'Montserrat',
            fontSize: '40px',
            fontStyle: '600',
            fill: '#000000'
          });
        
        playText.setScrollFactor(0);
        playText.setInteractive({useHandCursor: true});
        playText.on('pointerdown', () => this.play());

        let instructText = this.add.text(220, 290, `INSTRUCTIONS`, {
            fontFamily:'Montserrat',
            fontSize: '40px',
            fontStyle: '600',
            fill: '#000000'
          });
        
        instructText.setScrollFactor(0);
        instructText.setInteractive({useHandCursor: true});
        instructText.on('pointerdown', () => this.instructions());
    }

    play(){ 
        this.scene.start("GameScene");
    }

    instructions(){
        this.scene.start("InstructionScene");
    }
}