class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    }

    create() {

        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'First press "1" for 1-player and "2" for 2-players', menuConfig).setOrigin(0.5);
        this.playerCountText = this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding, 'Currently 1 Player', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding, 'Then press ← for Novice and → for Expert', menuConfig).setOrigin(0.5);


        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        game.isTwoPlayers = false;
        p1Score = 0;
        p2Score = 0;  

                
    }

    update() {
        if (Phaser.Input.Keyboard.DownDuration(keyLEFT, 25)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.DownDuration(keyRIGHT, 25)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          //console.log("has two players:" + this.game.isTwoPlayers); 
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(key1) && this.game.isTwoPlayers == true){
          this.game.isTwoPlayers = false;
          this.playerCountText.text = "Currently 1 Player";
          this.sound.play('sfx_select');
        }
        if (Phaser.Input.Keyboard.JustDown(key2) && this.game.isTwoPlayers == false){
          this.game.isTwoPlayers = true;
          this.playerCountText.text = "Currently 2 Players";
          this.sound.play('sfx_select');
        }
    }

}

