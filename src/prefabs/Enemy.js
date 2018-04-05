export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, bulletLayer, frame) {
        super(game, x, y, 'enemy', frame);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.velocity.x = 100;
        this.bulletLayer = bulletLayer;
        this.outOfBoundsKill = true;

    }

    fire() {
        
    }

    update() {
        // It would be nice if velocity.x switches direction
        // when it hits something else. This would let us put
        // enemies wherever and not worry about weird, overlapping
        // physics. Also, we should make a "wall" object so we don't
        // have to manually switch direction everytime it gets to
        // the end of the map.
    }

}