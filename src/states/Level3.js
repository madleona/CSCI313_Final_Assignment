import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Level3 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level3');
        
        this.projectiles = this.add.group();
        this.player = new Player(this.game, 43, 650, this.projectiles);
        this.game.add.existing(this.player);
        
        this.enemies = this.add.group();
        this.enemyBullets = this.add.group();
        let enemy = new Enemy(this.game, 70, 10, 'dragon', this.enemyBullets);
        this.enemies.add(enemy);

        this.health = new HealthBar(this.game, 200, 10, this.game.lives);

        this.pots = this.add.group();
        this.spawnPot(0, 670);
        this.spawnPot(35, 670);
        this.spawnPot(270, 670);
        this.spawnPot(235, 670);

        this.hearts = this.add.group();

        var music = this.game.add.audio('level_3_music');
        music.play();
        music.loopFull();
        this.breakingPot = this.game.add.audio('bottle_sound');
    }

    update() {

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.enemies, this.enemyBullets, this.damageEnemyFromBullet, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.enemies, this.projectiles, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.enemyBullets, this.projectiles, this.deflectEnemyBullets, null, this);

        this.physics.arcade.collide(this.player, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemies, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.pots, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.pots, this.projectilePotCollide, null, this);

        this.physics.arcade.overlap(this.player, this.hearts, this.addLife, null, this);
    }

    addLife(player, heart) {
        this.health.addLife();
        heart.kill();
    }

    damagePlayer(playerRef, enemyRef) {
        this.health.loseLife();
        if (this.health.livesLeft() == 0) {
            this.player.damage(100);
        }
        enemyRef.kill();
        this.numEnemies--;
    }

    damageEnemy(enemy, projectile) {
        projectile.kill();
        var x = enemy.body.x;
        var y = enemy.body.y;

        enemy.damage(1);
        if (enemy.lives == 0) {
            enemy.kill();

            this.numEnemies--;
            this.game.sound.stopAll();
            this.game.state.start('gameOverHappy');
        }
    }

    deflectEnemyBullets(enemyBullet, projectile) {
        switch (projectile.direction) {
            case 'right':
                if (enemyBullet.body.velocity.x < 0)
                    enemyBullet.body.velocity.x = -enemyBullet.body.velocity.x;
                break;
            case 'left':
                if (enemyBullet.body.velocity.x > 0)
                    enemyBullet.body.velocity.x = -enemyBullet.body.velocity.x;
                break;
            case 'up':
                if (enemyBullet.body.velocity.y > 0)
                    enemyBullet.body.velocity.y = -enemyBullet.body.velocity.y;
                break;
            case 'normal':
                if (enemyBullet.body.velocity.y < 0)
                    enemyBullet.body.velocity.y = -enemyBullet.body.velocity.y;
                break;
            default: { break; }
        }

        enemyBullet.reflected = true;
        projectile.kill();
    }

    damageEnemyFromBullet(enemy, bullet) {
        // Turning this off for the dragon.
        //if (bullet.reflected)
        //    this.damageEnemy(enemy, bullet);
    }

    enemyBulletCollide(enemyBullet, obstacle) {
        enemyBullet.kill();
    }

    enemyCollide(enemy, sprite) {
        enemy.changeDirection();
    }

    projectileCollide(projectile, obstacle) {
        projectile.kill();
    }

    projectilePotCollide(projectile, pot) {
        var x = pot.body.x;
        var y = pot.body.y;

        projectile.kill();
        pot.kill();
        this.breakingPot.play();

        var heart = this.hearts.create(x, y, 'heart');
        this.physics.arcade.enableBody(heart);
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
