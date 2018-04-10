export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, type, bulletLayer, frame) {
        // type should be rabbit, mushroom, etc.
        super(game, x, y, type, frame);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.wid

        this.body.velocity.x = 100;
        this.bulletLayer = bulletLayer;
        this.outOfBoundsKill = true;
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);

    }

    fire() {
        
    }

    update() {
        // It would be nice if velocity.x switches direction
        // when it hits something else. This would let us put
        // enemies wherever and not worry about weird, overlapping
        // physics. Also, they can change direction when they go
        // out of bounds
        
        console.log(this.body.velocity.x);
        
    }

}