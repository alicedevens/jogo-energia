export class WelcomeScene extends Phaser.Scene {

    constructor() {
        super("WelcomeScene");
    }

    preload() {
        this.load.image("paisagem", "/assets/background-jogo.jpg");
        this.load.image("start", "assets/botao_play.png")

    }

    create() {
        this.add.image(557, 359, "paisagem").setScale(2);
        this.start = this.add.image(400, 200, "start").setScale(0.5).setInteractive();
        this.start.on("pointerdown", () => {
            this.scene.start("GameScene");  
    }) 
    this.add.text(90, 359, 'PARA SE MOVIMENTAR, BASTA UTILIZAR AS SETAS DO TECLADO', {fontSize: '20px', fill: '#fff', fontStyle: 'bold'})
    }

    update() {

    }
}