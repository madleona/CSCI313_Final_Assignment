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
        let enemy1 = new Enemy(this.game, 120, 100, 'mushroom', this.enemyBullets);
        let enemy2 = new Enemy(this.game, 70, 100, 'mushroom', this.enemyBullets);
        let enemy3 = new Enemy(this.game, 20, 100, 'mushroom', this.enemyBullets);
        let enemy4 = new Enemy(this.game, 160, 450, 'mushroom', this.enemyBullets);
        let enemy5 = new Enemy(this.game, 250, 300, 'mushroom', this.enemyBullets);
        this.enemies.add(enemy1);
        this.enemies.add(enemy2);
        this.enemies.add(enemy3);
        this.enemies.add(enemy4);
        this.enemies.add(enemy5);
        this.numEnemies = 5;

        //create the player again
        //this.player = new Player(this.game, 0, 0, Level1.getPlayerHealth());
        this.projectiles = this.add.group();
        this.player = new Player(this.game, 225, 650, this.projectiles);
        this.game.add.existing(this.player);

        this.health = new HealthBar(this.game, 200, 10, this.game.lives);

        this.trees = this.add.group();
        this.spawnTree(120, 0);
        this.spawnTree(155, 130);
        this.spawnTree(155, 205);
        this.spawnTree(230, 215);
        this.spawnTree(0, 370);
        this.spawnTree(75, 360);
        this.spawnTree(150, 370);
        this.spawnTree(65, 525);
        this.spawnTree(135, 645);
        this.spawnTree(215, 500);

        this.pots = this.add.group();
        this.spawnPot(270, 130);
        this.spawnPot(270, 160);
        this.spawnPot(270, 190);
        this.spawnPot(70, 600);

        this.hearts = this.add.group();
        
        var music = this.game.add.audio('level_2_music');
        music.play();
        music.loopFull();
    }

    update() {
        console.log("this.numEnemies: " + this.numEnemies);

        if (this.player.y < 17 && (20 <= this.player.x && this.player.x <= 65) && this.numEnemies == 0) {
            this.game.sound.stopAll();
            this.game.state.start('level3');
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);

        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayerEnemy, null, this);
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

        this.physics.arcade.overlap(this.player, this.hearts, this.addLife, null, this);
    }

    addLife(player, heart) {
        console.log('in addLife');
        this.health.addLife();
        heart.kill();
    }

    damagePlayer(playerRef, enemyRef) {
        this.health.loseLife();
        console.log(this.health.livesLeft())
        if (this.health.livesLeft() == 0) {
            this.player.damage(100);
        }
        //this.player.damage(100);
        enemyRef.kill();

        //this.numEnemies--;
    }

    damagePlayerEnemy(playerRef, enemyRef) {
        this.health.loseLife();
        console.log(this.health.livesLeft())
        if (this.health.livesLeft() == 0) {
            this.player.damage(100);
        }
        //this.player.damage(100);
        enemyRef.kill();

        this.numEnemies--;
    }

    damageEnemy(enemy, projectile) {
        
        projectile.kill();
        var x = enemy.body.x;
        var y = enemy.body.y;

        enemy.lives -= 1;
        if (enemy.lives == 0) {
            delete enemy.type; // Probs a better way of doing this
            enemy.kill();

            var dropsHeart = Phaser.Utils.chanceRoll(100);
            if (dropsHeart) {
                //var tree = this.trees.create(x, y, 'tree');
                var heart = this.hearts.create(x, y, 'heart');
                this.physics.arcade.enableBody(heart);
            }

            this.numEnemies--;
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

        projectile.kill();
    }

    enemyCollide(enemy, sprite) {
        enemy.changeDirection();
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
