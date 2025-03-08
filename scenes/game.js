export class GameScene extends Phaser.Scene {

    alturaJogo = 718;
    larguraJogo = 1114;
    plataformas = [];
    energia = 0;
    barra;
    raio;
    personagem_frente;
    cafe = [];

    constructor() {
        super({key:"GameScene"});

    }

    preload() {
        //carregando as imagens que serão usadas 
        this.load.image("paisagem", "../assets/background-jogo.jpg");
        this.load.image("plataforma", "../assets/plataforma.png");
        this.load.image("personagem_frente", "../assets/personagem_frente.png");
        this.load.image("raio", "../assets/raio.png");
        this.load.image("cafe", "/assets/café.png");

        this.moveCam = false; //a câmera começa parada junto com o personagem
    }

    create() {
        this.physics.world.setBounds(0, 0, 1600, 718);
        this.cameras.main.setBounds(0, 0, 1600, 718); //define o tamanho do jogo que a camera irá seguir
        

        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(2); //a paisagem sendo adicionada 
        this.raio = this.add.image(220, 100, "raio").setScale(0.6); //a imagem da barra de energia sendo adicionada 
        this.barra = this.add.rectangle(72, 100, 1, 60.6, 0x009d6b); //a energia subindo foi criada a partir desse retângulo

        

        this.player = this.physics.add.sprite(100, 100, 'personagem_frente').setScale(0.4); //adicionando aonde o personagem vai surgir 
        this.player.body.setSize(151, 195, true);
        this.player.setCollideWorldBounds(true);
       
//adicionando as plataformas em suas respectivas localizações 
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        this.plataformas[2] = this.physics.add.staticImage(1000, 580, 'plataforma');
        this.plataformas[2].body.setSize(148, 44, true);
        this.plataformas[2].setScale(0.3);

        this.plataformas[3] = this.physics.add.staticImage(1500, 200, 'plataforma');
        this.plataformas[3].body.setSize(148, 44, true);
        this.plataformas[3].setScale(0.3);


//adicionando as colisões do personagem com as plataformas
        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

//adicionando as cápsulas de café e ajeitando o tamanho e a posição 
        this.cafe[0] = this.physics.add.staticImage(200, 410, 'cafe').setScale(0.2).setSize(60,40).setOffset(145,155);
        this.cafe[1] = this.physics.add.staticImage(580, 320, 'cafe').setScale(0.2).setSize(60,40).setOffset(145,155);
        this.cafe[2] = this.physics.add.staticImage(1000, 540, 'cafe').setScale(0.2).setSize(60,40).setOffset(145,155);
        this.cafe[3] = this.physics.add.staticImage(1500, 160, 'cafe').setScale(0.2).setSize(60,40).setOffset(145,155);


        //quando o boneco encostar na cafe0 -> destruir o café
        this.physics.add.overlap(this.player, this.cafe[0], () => { 
            this.cafe[0].destroy(); //o café é "destruído"     
            if (this.energia < 100) {
                this.energia += 25 //a energia da barra aumenta de 25 em 25
            }
            this.barra.width = 339.6 * (this.energia / 100);
        });

        //quando o boneco encostar no cafe1 
        this.physics.add.overlap(this.player, this.cafe[1], () => { 
            this.cafe[1].destroy(); //o café é "destruído"      
            if (this.energia < 100) {
                this.energia += 25
            }
            this.barra.width = 339.6 * (this.energia / 100);
        });   

        //quando o boneco encostar no cafe2 
        this.physics.add.overlap(this.player, this.cafe[2], () => { 
            this.cafe[2].destroy(); //o café é "destruído"      
            if (this.energia < 100) {
                this.energia += 25
            }
            this.barra.width = 339.6 * (this.energia / 100);
        });   

        //quando o boneco encostar no cafe3
        this.physics.add.overlap(this.player, this.cafe[3], () => { 
            this.cafe[3].destroy(); //o café é "destruído"     
            if (this.energia < 100) {
                this.energia += 25
            }
            this.barra.width = 339.6 * (this.energia / 100);
        });   
        
   

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

        this.barra.setScrollFactor(0); //para fazer com que a barra (o retângulo) não saia da tela enquanto a camera move pro lado 
        this.raio.setScrollFactor(0); //para fazer com que o raio e o desenho que delimita o espaço do retangulo também não saiam do lugar 
    

    }
}
