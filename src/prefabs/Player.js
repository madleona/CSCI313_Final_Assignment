import PlayerModel from "../models/PlayerModel.js";

export default class Player extends Phaser.Sprite {

    constructor(game, x, y, projectiles, health = 100)
    {
        super(game, x, y, 'princess_default', 0);
        this.playerModel = new PlayerModel(10, 10, health);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        this.fireposition = { x: 0, y: 0 };

        this.projectileSpites = projectiles;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.swingReset = true;
        this.direction = 'normal';

        
    }

    update() {
        var sound = this.game.add.audio('attack_sound');
        // write your prefab's specific update code here
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.playerModel.max_speed;

            //show left model
            super.loadTexture('princess_left');
            this.direction = 'left';
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.playerModel.max_speed;

            //show right model
            super.loadTexture('princess_right');
            this.direction = 'right';
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.playerModel.max_speed;

            //show up model
            super.loadTexture('princess_up');
            this.direction = 'up';
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.playerModel.max_speed;

            //show down model
            super.loadTexture('princess_default');
            this.direction = 'normal';
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0; 
        }

        if (this.attackButton.isDown) {
            sound.play();
            this.attack();
            this.swingReset = false;
        }

        if (this.attackButton.isUp) {
            this.swingReset = true;
        }
    }

    attack()
    {
        if (this.playerModel.sword.canBeSwung(this.swingReset))
        {
            var yVelocity = 0;
            var xVelocity = 0;

            console.log("this.direction: " + this.direction);

            switch (this.direction) {
                case 'normal':
                {
                    super.loadTexture('princess_default_attack');
                    yVelocity = 200;
                    break;
                }
                case 'right':
                {
                    super.loadTexture('princess_right_attack');
                    xVelocity = 200;
                    break;
                }
                case 'left':
                {
                    super.loadTexture('princess_left_attack');
                    xVelocity = -200;
                    break;
                }
                case 'up':
                {
                    super.loadTexture('princess_up_attack');
                    yVelocity = -200;
                    break;
                    }
            }

            this.playerModel.sword.attack();
            //change back to whatever the graphic was, but after a little while
            //i'm not sure how to do that yet, but I'll figure it out

            let projectile = this.projectileSpites.getFirstDead();
            if (projectile) {
                projectile.x = this.x + this.fireposition.x;
                projectile.y = this.y + this.fireposition.y;
                projectile.revive();

                projectile.body.velocity.y = yVelocity;
                projectile.body.velocity.x = xVelocity;
            } else {
                projectile = this.projectileSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "sparkle");
                this.game.physics.enable(projectile, Phaser.Physics.ARCADE);
                projectile.outOfBoundsKill = true;
                projectile.checkWorldBounds = true;
                projectile.body.velocity.y = yVelocity;
                projectile.body.velocity.x = xVelocity;
            }
        }
    }

    damage(amt)
    {
        this.playerModel.damage(amt);
    }

    heal(amt)
    {
        this.playerModel.heal(amt);
    }
}