class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starSpeeder', './assets/starSpeeder.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfieldParalax1', './assets/starfield2.png')
        this.load.image('starfieldParalax2', './assets/starfield3.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // background tile sprite
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);

        this.starfieldParalax1 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;

        this.starfieldParalax2 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax2').setOrigin(0, 0);
        this.starfieldParalax2.tilePositionY += 400;
        this.starfieldParalax2.alpha = .3;


        // green background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);
        
        // white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)

        let randomNumber  = (min, max) => {
            max -= min;
            return Math.floor(Math.random() * max) + min;
        }        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, randomNumber(borderUISize*4, game.config.height - borderUISize*3 - borderPadding), 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, randomNumber(borderUISize*4, game.config.height - borderUISize*3 - borderPadding), 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, randomNumber(borderUISize*4, game.config.height - borderUISize*3 - borderPadding), 'spaceship', 0, 10).setOrigin(0,0);
        
        // add starSpeeder
        this.speeder01 = new Spaceship(this, game.config.width + borderUISize*4, borderUISize*6, 'starSpeeder', 0, 50, 5).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1ScoreText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, p1Score, scoreConfig);
        if (this.game.isTwoPlayers){
            console.log("Has 2 players");
            this.p1ScoreText.text = "P1: " + p1Score;
            this.p2ScoreText = this.add.text(game.config.width/4, borderUISize + borderPadding*2, "P2: " + p2Score, scoreConfig);
        }
        
        // display High Score
        this.scoreRight = this.add.text(game.config.width - (borderUISize + borderPadding + scoreConfig.fixedWidth), borderUISize + borderPadding*2, 'HS:' + highScore, scoreConfig);

        // display timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 10,
            bottom: 10,
            },
            fixedWidth: 100
        }
        this.timeLeft = game.settings.gameTimer / 1000;
        this.timerText = this.add.text(game.config.width/2 - timerConfig.fixedWidth/2, borderUISize + borderPadding*1.5, this.timeLeft, timerConfig);

        // display "FIRE"
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 70
        }
        this.fireText = this.add.text((game.config.width/3)*2 - borderPadding*2, borderUISize + borderPadding*2, "FIRE", fireConfig);
        this.fireText.alpha = 0;

        // flags
        this.gameOver = false;

        // 60 sec play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (game.isTwoPlayers && !playerTwoActive) {
                this.countdown = this.time.delayedCall(5000, () => {playerTwoActive = true; this.scene.restart()}, null, this);
                this.p2CoutdownText = this.add.text(game.config.width/2, game.config.height/2, "Player Two Starts In... 5", scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            } else {
                this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
        }, null, this);

        // particle emmiter declaration
        // let hitParticleEmitter = new ParticleEmitter({this, 'scraps'}, {});
    }


    update() {

        // update p2coutdown
        if (game.isTwoPlayers && !playerTwoActive && this.gameOver) {
            this.p2CoutdownText.text = "Player 2 Starts In... " + Math.floor((this.countdown.getRemaining())/1000);
        }

        // update timer
        this.timerText.text = Math.floor((this.clock.getRemaining())/1000);

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            if (game.isTwoPlayers && !playerTwoActive){}
            else {
                p1Score = 0;
                p2Score = 0;  
                this.scene.restart();
            }
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (game.isTwoPlayers && !playerTwoActive){}
            else {
                this.scene.start("menuScene");
            }
            
        }

        this.starfield.tilePositionX -= 4;
        this.starfieldParalax1.tilePositionX -= 2;
        this.starfieldParalax2.tilePositionX -= 8;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.speeder01.update();
        }

        if (this.p1Rocket.isFiring) this.fireText.alpha = 1;
        else this.fireText.alpha = 0;

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.speeder01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.speeder01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       

        // score add and repaint
        if (playerTwoActive) {
            p2Score += ship.points;
            this.p2ScoreText.text = "P2:" + p2Score;

            if (p2Score > highScore) {
                highScore = p2Score;
                this.scoreRight.text = 'HS:' + highScore;
            }
        } else {
            p1Score += ship.points;
            this.p1ScoreText.text = "P1:" + p1Score;

            if (p1Score > highScore) {
                highScore = p1Score;
                this.scoreRight.text = 'HS:' + highScore;
            }
        }

        this.sound.play('sfx_explosion');
      }

}