import Level1 from "../states/Level1.js";
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";

export default class Level2 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level2');
        console.log("In Level2.js, press SPACEBAR to progress to Level3.js")

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'mushroom', this.enemyBullets);
        this.enemies.add(enemy);

        //create the player again
        //this.player = new Player(this.game, 0, 0, Level1.getPlayerHealth());
        this.player = new Player(this.game, 193, 650, 100);
        this.game.add.existing(this.player);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level2.js')
            this.game.state.start('level3');
        }

        if (this.player.y < 17 && (20 <= this.player.x && this.player.x <= 65)) {
            console.log('Leaving Level2.js')
            this.game.state.start('level3');
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);

        if (this.player.playerModel.health <= 0) {
            this.game.state.start('gameOverSad')
        }

        //useful to tell the position of the player
        //console.log("Player (x,y) : " + "(" + this.player.x + "," + this.player.y + ")");
    }

    damagePlayer(playerRef, enemyRef) {
        this.player.damage(100);
        enemyRef.kill();
    }
}
