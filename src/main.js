let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, key1, key2;

// persistant high score
let highScore = 0;
let p1Score = 0;
let p2Score = 0;
let playerTwoActive = false;

//set UI
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
