import EnemyModel from '../models/EnemyModel.js';

export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, type, bulletLayer, frame) {
        // type should be rabbit, mushroom, or dragon
        super(game, x, y, type, frame);
        this.type = type;
        this.enemyModel = new EnemyModel(this.type);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.velocity.x = this.enemyModel.xVelocity;

        this.bulletLayer = bulletLayer;
        this.outOfBoundsKill = true;

        // handle what happens when an enemy hits the edge of the map
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = new Phaser.Signal();
        this.body.onWorldBounds.add(this.changeDirection, this)

        this.body.bounce.set(1);

        this.currentVelocity = this.body.velocity.x;
    }

    changeDirection() {
        this.scale.x *= -1;
        // The axis it flips over isn't in the middle of the enemy, so
        // it's necessary to offset that change in position. Google results
        // second this method. - Kaleb
        // P.S. this feels like a Phaser bug, but depending on the direction
        // an enemy is moving, its width could be negative ¯\_(?)_/¯
        // So, only one line will fix the offset issue.
        this.body.x -= this.width;
    }

    fire() {
        let bullet;

        if (this.type == 'dragon') {
            bullet = this.bulletLayer.create(this.x + 100, this.y, 'fireball');
        } else {
            bullet = this.bulletLayer.create(this.x, this.y, "orb");
        }
        
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.reflected = false;
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
        bullet.body.velocity.y = 100;
    }

    update() {
        if (this.visible && this.enemyModel.willFire()) {
            this.fire();
        }
    }

    damage(amount) {
        this.enemyModel.damage(amount);
        this.lives = this.enemyModel.lives;
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

    destroy() {
        delete this.enemyModel.type;
    }

}