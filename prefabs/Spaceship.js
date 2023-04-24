class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, shipSpeed = game.settings.spaceshipSpeed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = shipSpeed;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around the screen
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }

}