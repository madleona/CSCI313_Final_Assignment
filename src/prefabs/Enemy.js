export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, type, bulletLayer, frame) {
        // type should be rabbit, mushroom, etc.
        super(game, x, y, type, frame);
        this.type = type;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        if (type == 'rabbit') {
            this.body.velocity.x = -100;// starting velocity
        }
        //else if (type == 'mushroom') {
        //    this.body.velocity.x = -300;// starting velocity
        //}

        this.bulletLayer = bulletLayer;
        this.outOfBoundsKill = true;

        // handle what happens when an enemy hits the edge of the map
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = new Phaser.Signal();
        this.body.onWorldBounds.add(this.hitWorldBounds, this)

        this.body.bounce.set(1);

        this.currentVelocity = this.body.velocity.x;

    }

    fire() {
        let bullet = this.bulletLayer.create(this.x, this.y, "orb");
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.y = 100;
    }

    update() {
        //this.willFire = Phaser.Utils.chanceRoll(1);
        //this.willFire = Phaser.Utils.chanceRoll(3);
        //if (this.willFire) {
        //    this.fire();
        //}

        if (this.type == 'rabbit') {
            this.willFire = Phaser.Utils.chanceRoll(1);
            if (this.willFire) {
                this.fire();
            }
        }
        else if (this.type == 'mushroom') {
            this.willFire = Phaser.Utils.chanceRoll(1);
            if (this.willFire) {
                this.fire();
            }
        }
    }

    hitWorldBounds(sprite) {
        this.scale.x *= -1;
        // The axis it flips over isn't in the middle of the enemy, so
        // it's necessary to offset that change in position. Google results
        // second this method. - Kaleb
        // P.S. this feels like a Phaser bug, but depending on the direction
        // an enemy is moving, its width could be negative ¯\_(?)_/¯
        // So, only one line will fix the offset issue.
        this.body.x -= this.width;
    }

}