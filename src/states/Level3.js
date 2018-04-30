import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Level3 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level3');

        //create the player again
        //this.player = new Player(this.game, 0, 0, Level1.getPlayerHealth());
        this.projectiles = this.add.group();
        this.player = new Player(this.game, 43, 650, this.projectiles);
        this.game.add.existing(this.player);

        console.log("In Level3.js, press H to progress to GameOverHappy.js");

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'dragon', this.enemyBullets);
        this.enemies.add(enemy);

        this.health = new HealthBar(this.game, 200, 10, this.game.lives);

        this.pots = this.add.group();
        this.spawnPot(0, 670);
        this.spawnPot(35, 670);
        this.spawnPot(270, 670);
        this.spawnPot(235, 670);

        var music = this.game.add.audio('level_3_music');
        music.play();
        music.loopFull();
    }

    update() {

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
            console.log('Leaving Level3.js to GameOverHappy.js');
            this.game.sound.stopAll();
            this.game.state.start('gameOverHappy');
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.enemies, this.projectiles, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.enemyBullets, this.projectiles, this.deflectEnemyBullets, null, this);

        this.physics.arcade.collide(this.player, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemies, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.pots, null, null, this);

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

    spawnPot(x, y) {
        var pot = this.pots.create(x, y, 'pot');
        this.physics.arcade.enableBody(pot);
        pot.body.allowGravity = false;
        pot.body.immovable = true;

        return pot;
    }
}
