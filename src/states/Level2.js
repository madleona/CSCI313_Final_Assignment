import Level1 from "../states/Level1.js";
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Level2 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level2');

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'mushroom', this.enemyBullets);
        this.enemies.add(enemy);

        //create the player again
        //this.player = new Player(this.game, 0, 0, Level1.getPlayerHealth());
        this.projectiles = this.add.group();
        this.player = new Player(this.game, 193, 650, this.projectiles);
        this.game.add.existing(this.player);

        this.health = new HealthBar(this.game, 200, 10, this.game.lives);

        var music = this.game.add.audio('level_2_music');
        music.play();
        music.loopFull();
    }

    update() {
        if (this.player.y < 17 && (20 <= this.player.x && this.player.x <= 65)) {
            this.game.sound.stopAll();
            this.game.state.start('level3');
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);

        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.enemies, this.projectiles, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.enemyBullets, this.projectiles, this.deflectEnemyBullets, null, this);
    }

    damagePlayer(playerRef, enemyRef) {
        this.health.loseLife();
        console.log(this.health.livesLeft())
        if (this.health.livesLeft() == 0) {
            this.player.damage(100);
        }
        //this.player.damage(100);
        enemyRef.kill();
    }

    damageEnemy(enemy, projectile) {
        enemy.kill();
        projectile.kill();
        delete enemy.type;
    }

    deflectEnemyBullets(enemyBullet, projectile) {
        if (enemyBullet.body.velocity.y > 0)
            enemyBullet.body.velocity.y = -enemyBullet.body.velocity.y;
        projectile.kill();
    }

    getPlayerHealth() {
        return this.player.playerModel.health;
    }
}
