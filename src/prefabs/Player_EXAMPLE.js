import PlayerModel from "../models/PlayerModel_EXAMPLE.js";

export default class Player_EXAMPLE extends Phaser.Sprite {

    constructor(game, x, y, bullets, bullets2, bullets3, bullets4) {
        super(game, x, y, 'player', 0);
        //test
        this.playerModel = new PlayerModel(10, 10);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        this.bulletSpites = bullets;
        this.bullet2Sprites = bullets2;
        this.bullet3Sprites = bullets3;
        this.bullet4Sprites = bullets4;
        this.fireposition = {x: 160, y: 100};

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.fireButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.fireButton3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.fireButton4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

        this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
        this.fireAnimation = this.animations.add("fire", [11, 12, 13]);
        this.fireAnimation.onComplete.add(this.playFly, this);
        this.animations.play("fly", 14, true);
    }

    update() {
        // write your prefab's specific update code here
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.playerModel.max_speed;
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.playerModel.max_speed;
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.playerModel.max_speed;
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.playerModel.max_speed;
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0;
        }

        if (this.fireButton.isDown) {
            this.fire();
        }
        if (this.fireButton2.isDown) {
            this.fire2();
        }
        if (this.fireButton3.isDown) {
            this.fire3();
        }
        if (this.fireButton4.isDown) {
            this.fire4();
        }
    }

    fire() {

        if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bulletSpites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");

        }
    }

    fire2() {

        if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire2();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bullet2Sprites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bullet2Sprites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet2");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");

        }
    }

    fire3() {

        if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire3();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bullet3Sprites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bullet3Sprites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet3");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");

        }
    }

    fire4() {

        if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire4();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bullet4Sprites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bullet4Sprites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet4");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");

        }
    }

    damage(amt) {
        this.playerModel.damage(amt);
    }

    heal(amt) {
        this.playerModel.heal(amt);
    }

    playFly() {
        this.animations.play("fly", 14, true);
    }

    powerup(power)
    {
        //determine type of powerup here???
        
    }
}