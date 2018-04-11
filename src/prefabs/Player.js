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
    }

    update() {
        // write your prefab's specific update code here
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.playerModel.max_speed;

            //show left model
            super.loadTexture('rabbit');
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.playerModel.max_speed;

            //show right model
            super.loadTexture('mushroom');
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.body.velocity.x = 0;

            //show normal model
            //super.loadTexture('princess');
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.playerModel.max_speed;

            //show up model
            super.loadTexture('enemy');
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.playerModel.max_speed;

            //show down model
            super.loadTexture('loading_bg');
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0;

            //show normal model
            //super.loadTexture('princess');   
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

    damage(amt)
    {
        this.playerModel.damage(amt);
    }

    heal(amt)
    {
        this.playerModel.heal(amt);
    }
}