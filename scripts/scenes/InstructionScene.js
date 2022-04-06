export default class InstructionScene extends Phaser.Scene{

    constructor(){
        super("InstructionScene")
    }

    init(){
        this.counter = 1;
    }

    preload(){
       this.load.image('controls', './assets/images/controls.png');
       this.load.image('lives', './assets/images/life-mechanics.png');
       this.load.image('coins', './assets/images/coin-mechanics.png');
       this.load.image('mobs', './assets/images/mob-mechanics.png');
    }

    create(){

        this.controls = this.add.image(400, 246, 'controls');
        this.lives  = this.add.image(400, 246, 'lives');
        this.coins  = this.add.image(400, 246, 'coins');
        this.mobs  = this.add.image(400, 246, 'mobs');

        //Default Visibility
        this.lives.setVisible(false);
        this.coins.setVisible(false);
        this.mobs.setVisible(false);

        this.next = this.add.text(730, 450, `NEXT`, {
            fontFamily:'Montserrat',
            fontSize: '20px',
            fontStyle: '600',
            fill: '#000000'
        });
        this.next.setScrollFactor(0);
        this.next.setInteractive({useHandCursor: true});
        this.next.on('pointerdown', () => this.nxtPage());

        this.prev = this.add.text(10, 450, `PREV`, {
            fontFamily:'Montserrat',
            fontSize: '20px',
            fontStyle: '600',
            fill: '#000000'
        });
        this.prev.setScrollFactor(0);
        this.prev.setInteractive({useHandCursor: true});
        this.prev.on('pointerdown', () => this.prevPage());

        // Default Visibility
        this.prev.setVisible(false);

        this.closeScene = this.add.text(20, 10, `CLOSE`, {
            fontFamily:'Montserrat',
            fontSize: '20px',
            fontStyle: '600',
            fill: '#000000'
        });
        this.closeScene.setScrollFactor(0);
        this.closeScene.setInteractive({useHandCursor: true});
        this.closeScene.on('pointerdown', () => this.close());

        this.playGame = this.add.text(660, 10, `PLAY GAME`, {
            fontFamily:'Montserrat',
            fontSize: '20px',
            fontStyle: '600',
            fill: '#000000'
        });
        this.playGame.setScrollFactor(0);
        this.playGame.setInteractive({useHandCursor: true});
        this.playGame.on('pointerdown', () => this.play());

        //Default Visibility
        this.playGame.setVisible(false);

    }

    nxtPage(){
        this.counter++
        if(this.counter==2){
            this.lives.setVisible(true);
            this.prev.setVisible(true);
        }

        if(this.counter==3){
            this.coins.setVisible(true);
        }

        if(this.counter==4){
            this.mobs.setVisible(true);
            this.next.setVisible(false);
            this.playGame.setVisible(true);
        }
    }

    prevPage(){
        this.counter--
        if(this.counter==1){
            this.lives.setVisible(false);
            this.prev.setVisible(false);
        }
        
        if(this.counter==2){
            this.coins.setVisible(false);
        }

        if(this.counter==3){
            this.mobs.setVisible(false);
            this.next.setVisible(true);
        }
    }

    close(){
        this.scene.start("TitleScene")
    }

    play(){
        this.scene.start("GameScene")
    }

}