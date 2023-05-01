/*
    Name: Alex Groff
    Mod Title: Rocket Patrol - Star Hunter
    Estimated Time: ~6 or 7 hours?
    Mods Chosen:
        - Track a high score that persists across scenes and display it in the UI (5)
        - Implement the 'FIRE' UI text from the original game (5)
        - Create a new scrolling tile sprite for the background (5)
        - Allow the player to control the Rocket after it's fired (5)

        - Display the time remaining (in seconds) on the screen (10)
        - Implement parallax scrolling for the background (10)

        - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
        - Implement an alternating two-player mode (15)
        - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)

    TA Approved Mods:
        - Randomize each spaceship's vertical position at the start of each play (5)
        - When rocket is fired, allow player's contol to tilt the rocket. Also sets the rocket's horizontal speed by severity of rocket angle (15)

    All sources used:
        - Base Rocket Patrol
        - Nathan's asset pack for Rocket Patrol
        - Phaser Docs

*/

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
