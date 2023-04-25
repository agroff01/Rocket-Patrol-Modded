
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add sound effects
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        } else {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                if (this.angle >= -30) this.angle--;
                this.x += this.moveSpeed * this.rotation * 3;
                
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                if (this.angle <= 30) this.angle++;
                this.x += this.moveSpeed * this.rotation * 3;
                
            } else if (!keyLEFT.isDown && !keyRIGHT.isDown) {
                if (this.angle < 0) this.angle += 1;
                else if (this.angle > 0) this.angle -= 1;
            }
            // bound movement past right wall
            if (this.x > game.config.width - borderUISize - this.width) this.x = game.config.width - borderUISize - this.width;

            // bound movement past left wall
            if (this.x < borderUISize + this.width) this.x = borderUISize + this.width;
        }

        

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize *3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.angle = 0;
    }
}