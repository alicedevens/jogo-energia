export class GameScene extends Phaser.Scene {

    alturaJogo = 718;
    larguraJogo = 1114;
    plataformas = [];
    energia = 0;
    barra;

    constructor() {
        super({key:"GameScene"});

    }

    preload() {
        this.load.image("paisagem", "assets/background-jogo.jpg");
        this.load.image("plataforma", "assets/plataforma.png");
        this.load.image("personagem_frente", "assets/personagem_frente.png");
        this.load.image("raio", "assets/raio.png");
        this.load.image("cafe", "assets/café.png");

        this.moveCam = false; //the camera starts still
    }

    create() {
        this.cameras.main.setBounds(0, 0, this.larguraJogo * 4, this.alturaJogo * 4);
        // this.physics.world.setBounds(0, 0, 668.4, 430.8);
        // this.player.setColliderWorldBounds(true);

        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(2);
        this.add.image(220, 100, "raio").setScale(0.6);
        this.barra = this.add.rectangle(72, 100, 1, 60.6, 0x009d6b);

        

        this.player = this.physics.add.sprite(200, 100, 'personagem_frente').setScale(0.4);
        this.player.body.setSize(151, 195, true);
       

        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        this.plataformas[2] = this.physics.add.staticImage(0, 1114, 'plataforma');
        this.plataformas[2].body.setSize(this.larguraJogo * 6, 60, true);
        this.plataformas[2].setScale(0.1);

        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        this.cafe[0] = this.physics.add.staticImage(200, 410, 'cafe').setScale(0.2);
        
        
        

        //adicione as setas do teclado 
        this.cursors = this.input.keyboard.createCursorKeys();

        //para criar a função da câmera subindo
        this.cameras.main.startFollow(this.player, true);

        
        this.cameras.main.setZoom(1);



    }

    update() {
        if (this.cursors.left.isDown) { // Movimentação horizontal
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.energia < 100) {
                this.energia += 1
            }
            this.barra.width = 339.6 * (this.energia / 100);
            console.log(this.barra.width)
            
        } else {
            this.player.setVelocityX(0);
        }

        // Lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { // && (this.player.body.touching.down || this.player.body.blocked.down)
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400); // Acelera a descida 
        }

        //configurações do movimento da câmera 
    //     const cam = this.cameras.main;

    //     if (cam.deadzone)
    //     {
    //         this.text.setText([
    //             'Cam Control: ' + this.moveCam,
    //             'ScrollX: ' + cam.scrollX,
    //             'ScrollY: ' + cam.scrollY,
    //             'MidX: ' + cam.midPoint.x,
    //             'MidY: ' + cam.midPoint.y,
    //             'deadzone left: ' + cam.deadzone.left,
    //             'deadzone right: ' + cam.deadzone.right,
    //             'deadzone top: ' + cam.deadzone.top,
    //             'deadzone bottom: ' + cam.deadzone.bottom
    //         ]);
    //     }
    //     else if (cam._tb)
    //     {
    //         this.text.setText([
    //             'Cam Control: ' + this.moveCam,
    //             'ScrollX: ' + cam.scrollX,
    //             'ScrollY: ' + cam.scrollY,
    //             'MidX: ' + cam.midPoint.x,
    //             'MidY: ' + cam.midPoint.y,
    //             'tb x: ' + cam._tb.x,
    //             'tb y: ' + cam._tb.y,
    //             'tb right: ' + cam._tb.right,
    //             'tb bottom: ' + cam._tb.bottom
    //         ]);
    //     }

    //     this.player.setVelocity(0);

    //     if (this.moveCam)
    //     {
    //         if (this.cursors.left.isDown)
    //         {
    //             cam.scrollX -= 4;
    //         }
    //         else if (this.cursors.right.isDown)
    //         {
    //             cam.scrollX += 4;
    //         }

    //         if (this.cursors.up.isDown)
    //         {
    //             cam.scrollY -= 4;
    //         }
    //         else if (this.cursors.down.isDown)
    //         {
    //             cam.scrollY += 4;
    //         }
    //     }
    //     else
    //     {
    //         if (this.cursors.left.isDown)
    //         {
    //             this.player.setVelocityX(-800);
    //         }
    //         else if (this.cursors.right.isDown)
    //         {
    //             this.player.setVelocityX(800);
    //         }

    //         if (this.cursors.up.isDown)
    //         {
    //             this.player.setVelocityY(-800);
    //         }
    //         else if (this.cursors.down.isDown)
    //         {
    //             this.player.setVelocityY(800);
    //         }
    //     }
    // }
}
}
