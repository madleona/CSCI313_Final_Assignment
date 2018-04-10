import PlayerModel from "../models/PlayerModel.js";

export default class Player extends Phaser.Sprite {

    constructor(game, x, y)
    {
        super(game, x, y, 'princess', 0);
        this.playerModel = new PlayerModel(10, 10);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        //idk if this is needed - chase
        //this.fireposition = { x: 160, y: 100 };

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        //we will need to change this for the sword swinging - chase
        //this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
        //this.fireAnimation = this.animations.add("fire", [11, 12, 13]);
        //this.fireAnimation.onComplete.add(this.playFly, this);
        //this.animations.play("fly", 14, true);
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

        if (this.attackButton.isDown) {
            this.attack();
        }
    }

    attack()
    {
        if (this.playerModel.sword.canBeSwung())
        {
            this.playerModel.sword.attack();
        }

        //this.animations.play('swing');
    }

    /*
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
    */

    damage(amt)
    {
        this.playerModel.damage(amt);
    }

    heal(amt)
    {
        this.playerModel.heal(amt);
    }

    //idk if this is needed - chase
    /*
    playFly() {
        this.animations.play("fly", 14, true);
    }
    */
}