export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, type, bulletLayer, frame) {
        // type should be rabbit, mushroom, etc.
        super(game, x, y, type, frame);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        if (type == 'rabbit') {
            this.body.velocity.x = 100;
        }
        this.bulletLayer = bulletLayer;
        this.outOfBoundsKill = true;
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);

    }

    fire() {
        let bullet = this.bulletLayer.create(this.x, this.y, "orb");
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.y = 100;
    }

    update() {
        this.willFire = Phaser.Utils.chanceRoll(1);
        if (this.willFire) {
            this.fire();
        }
        
        
    }

}