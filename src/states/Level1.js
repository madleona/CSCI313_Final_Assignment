import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Level1 extends Phaser.State {

    constructor() {
        super();
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level1');

        this.projectiles = this.add.group();
        this.player = new Player(this.game, 126, 650, this.projectiles);
        this.game.add.existing(this.player);
        this.lastDirection = "";
        
        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy1 = new Enemy(this.game, 100, 100, 'rabbit', this.enemyBullets);
        let enemy2 = new Enemy(this.game, 100, 300, 'rabbit', this.enemyBullets);
        let enemy3 = new Enemy(this.game, 1, 450, 'rabbit', this.enemyBullets);
        this.enemies.add(enemy1);
        this.enemies.add(enemy2);
        this.enemies.add(enemy3);
        this.numEnemies = 3;

        this.game.lives = 3; // patch for when restarting the game and game.lives != 3;
        this.health = new HealthBar(this.game, 200, 10, this.game.lives);
        
        this.trees = this.add.group();
        this.spawnTree(0, 0);
        this.spawnTree(0, 75);
        this.spawnTree(75, 0);
        this.spawnTree(120, 140);
        this.spawnTree(55, 575);
        this.spawnTree(225, 275);

        this.fences = this.add.group();
        this.spawnFence(0, 285);
        this.spawnFence(50, 285);

        this.pots = this.add.group();
        this.spawnPot(0, 255);
        this.spawnPot(30, 255);

        this.hearts = this.add.group();

        var music = this.game.add.audio('level_1_music');
        music.play();
        music.loopFull();
    }

    update() {
        //useful to tell the position of the player
        //console.log("Player (x,y) : " + "(" + this.player.x + "," + this.player.y + ")");
        //if the player is at the top of the level and within a certain x interval
        //and if are the enemies are dead
        if (this.player.y < 17 && (180 <= this.player.x && this.player.x <= 200) && this.numEnemies == 0) {
            this.game.sound.stopAll();
            this.game.state.start('level2')
        }

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.enemies, this.enemyBullets, this.damageEnemyFromBullet, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayerEnemy, null, this);
        this.physics.arcade.overlap(this.enemies, this.projectiles, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.enemyBullets, this.projectiles, this.deflectEnemyBullets, null, this);

        this.physics.arcade.collide(this.player, this.trees, null, null, this);
        this.physics.arcade.collide(this.enemies, this.trees, this.enemyCollide, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.trees, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.trees, this.projectileCollide, null, this);

        this.physics.arcade.collide(this.player, this.fences, null, null, this);
        this.physics.arcade.collide(this.enemies, this.fences, this.enemyCollide, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.fences, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.fences, this.projectileCollide, null, this);

        this.physics.arcade.collide(this.player, this.pots, null, null, this);
        this.physics.arcade.collide(this.enemies, this.pots, this.enemyCollide, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.pots, this.enemyBulletCollide, null, this);
        this.physics.arcade.collide(this.projectiles, this.pots, this.projectilePotCollide, null, this);

        

        this.physics.arcade.overlap(this.player, this.hearts, this.addLife, null, this);

        //console.log('health: ' + this.player.playerModel.health);

        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }
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

        console.log("enemyBullet.reflected: (false):" + enemyBullet.reflected);
        enemyBullet.reflected = true;
        console.log("enemyBullet.reflected: (true):" + enemyBullet.reflected);

        projectile.kill();
    }

    damageEnemyFromBullet(enemy, bullet) {
        if (bullet.reflected)
            this.damageEnemy(enemy, bullet);
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

    spawnFence(x, y) {
        var fence = this.fences.create(x, y, 'fence');
        this.physics.arcade.enableBody(fence);
        fence.body.allowGravity = false;
        fence.body.immovable = true;

        return fence;
    }

    spawnPot(x, y) {
        var pot = this.pots.create(x, y, 'pot');
        this.physics.arcade.enableBody(pot);
        pot.body.allowGravity = false;
        pot.body.immovable = true;

        return pot;
    }
}