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
        this.player = new Player(this.game, 225, 650, this.projectiles);
        this.game.add.existing(this.player);

        this.health = new HealthBar(this.game, 200, 10, this.game.lives);

        this.trees = this.add.group();
        this.spawnTree(120, 15);
        this.spawnTree(155, 130);
        this.spawnTree(155, 205);
        this.spawnTree(230, 215);
        this.spawnTree(0, 370);
        this.spawnTree(75, 360);
        this.spawnTree(150, 370);
        this.spawnTree(65, 525);
        this.spawnTree(135, 615);
        this.spawnTree(215, 500);

        this.pots = this.add.group();
        this.spawnPot(270, 130);
        this.spawnPot(270, 160);
        this.spawnPot(270, 190);
        this.spawnPot(70, 600);
        
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

        this.physics.arcade.collide(this.player, this.trees, null, null, this);
        this.physics.arcade.collide(this.enemies, this.trees, null, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.trees, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.trees, this.projectileCollide, null, this);

        this.physics.arcade.collide(this.player, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemies, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.pots, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.pots, this.projectilePotCollide, null, this);
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

    enemyBulletCollide(enemyBullet, obstacle) {
        enemyBullet.kill();
    }

    projectileCollide(projectile, obstacle) {
        projectile.kill();
    }

    projectilePotCollide(projectile, pot) {
        projectile.kill();

        //break pot
    }


    getPlayerHealth() {
        return this.player.playerModel.health;
    }

    spawnTree(x, y) {
        var tree = this.trees.create(x, y, 'tree');
        this.physics.arcade.enableBody(tree);
        tree.body.allowGravity = false;
        tree.body.immovable = true;

        return tree;
    }

    spawnPot(x, y) {
        var pot = this.pots.create(x, y, 'pot');
        this.physics.arcade.enableBody(pot);
        pot.body.allowGravity = false;
        pot.body.immovable = true;

        return pot;
    }
}
