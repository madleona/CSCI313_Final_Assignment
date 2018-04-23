import PlayerModel from "../models/PlayerModel.js";

export default class Player extends Phaser.Sprite {

    constructor(game, x, y, health = 100)
    {
        super(game, x, y, 'princess_default', 0);
        this.playerModel = new PlayerModel(10, 10, health);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        //idk if this is needed - chase
        //this.fireposition = { x: 160, y: 100 };

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.swingReset = true;
        this.direction = 'normal';
    }

    update() {
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
            this.direction = 'normal;
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0; 
        }

        if (this.attackButton.isDown) {
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
            switch (this.graphic) {
                case 'normal':
                    super.loadTexture('princess_default');
            }
            this.playerModel.sword.attack();
            //change back to whatever the graphic was
        }

        /*
        this.load.image('princess_default_attack', 'images/princess_up_attack.png');
        this.load.image('princess_left_attack', 'images/princess_left_attack.png');
        this.load.image('princess_right_attack', 'images/princess_right_arrow.png');
        this.load.image('princess_down_attack', 'images/princess_down_attack.png');
        */
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