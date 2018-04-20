import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";

export default class Level3 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level3');

        //create the player again
        //this.player = new Player(this.game, 0, 0, Level1.getPlayerHealth());
        this.player = new Player(this.game, 193, 650, 100);
        this.game.add.existing(this.player);

        console.log("In Level3.js, press SPACEBAR to progress to GameOverHappy.js, or press D (for Dead) to progress to GameOverSad.js");

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'dragon', this.enemyBullets);
        this.enemies.add(enemy);
    }

    update() {

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        if (this.player.playerModel.health <= 0) {
            this.game.state.start('gameOverSad')
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level3.js to GameOverHappy.js')
            this.game.state.start('gameOverHappy');
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            console.log('Leaving Level3.js to GameOverSad.js')
            this.game.state.start('gameOverSad');
        }

    }

    damagePlayer(playerRef, enemyRef) {
        this.player.damage(100);
        enemyRef.kill();
    }
}
