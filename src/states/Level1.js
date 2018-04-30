import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Level1 extends Phaser.State {

    constructor() {
        super();
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level1');
        
        //this.spawnChancePowerup = .2;
        //this.spawnChance = .02;
        //this.score = 0;

        //task We will need this comment here, to enable Phaser Physics, but since we don't have any code using it yet I'm leaving it commented for now 
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg');

        
        //this.bullets = this.add.group();
        //this.bullets2 = this.add.group();
        //this.bullets3 = this.add.group();
        //this.bullets4 = this.add.group();
        //this.enemyBullets = this.add.group();

        ////add player
        //this.player = new Player(this.game, 0, 0, this.bullets, this.bullets2, this.bullets3, this.bullets4);
        //this.game.add.existing(this.player);

        //add player
        this.projectiles = this.add.group();
        this.player = new Player(this.game, 126, 650, this.projectiles);
        this.game.add.existing(this.player);
        this.lastDirection = "";

        ////add a few enemeis..
        //this.enemies = this.add.group();
        //for (let i = 0; i < 5; i++) {
        //    let enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
        //    this.enemies.add(enemy);
        //}

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy1 = new Enemy(this.game, 100, 100, 'rabbit', this.enemyBullets);
        let enemy2 = new Enemy(this.game, 100, 300, 'rabbit', this.enemyBullets);
        let enemy3 = new Enemy(this.game, 1, 450, 'rabbit', this.enemyBullets);
        this.enemies.add(enemy1);
        this.enemies.add(enemy2);
        this.enemies.add(enemy3);

        this.game.lives = 3; // patch for when restarting the game and game.lives != 3;
        this.health = new HealthBar(this.game, 200, 10, this.game.lives);
    

        ////add the group for the powerups
        //this.powerups = this.add.group();

        ////add the explosions
        //this.explosions = this.game.add.emitter(0, 0, 200);
        //this.explosions.makeParticles("hexagon");
        //this.explosions.setAlpha(1, .2, 2000);

        ////add UI
        //this.setupUI();

        ////wave timer
        //this.waveTimer = this.game.time.create(false);
        //this.waveTimer.loop(20000, this.incrementWave, this);
        //this.waveTimer.start();

        this.trees = this.add.group();
        this.spawnTree(0, 0);
        this.spawnTree(0, 75);
        this.spawnTree(75, 0);
        this.spawnTree(120, 140);
        this.spawnTree(55, 585);
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

    //setupUI() {
    //    this.UILayer = this.add.group();

    //    this.scoreField = new NumberBox(this.game, "circle", 0);
    //    this.UILayer.add(this.scoreField);

    //    this.healthBar = new HealthBar(this.game, 120, 40, "health_bar", "health_holder");
    //    this.UILayer.add(this.healthBar);
    //}

    update() {
        //useful to tell the position of the player
        //console.log("Player (x,y) : " + "(" + this.player.x + "," + this.player.y + ")");
        //if the player is at the top of the level and within a certain x interval
        if (this.player.y < 17 && (180 <= this.player.x && this.player.x <= 200)) {
            this.game.sound.stopAll();
            this.game.state.start('level2')
        }
        

        //this.bg.tilePosition.x -= .5;

        //if (Math.random() < this.spawnChance) {
        //    let enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
        //    this.enemies.add(enemy);
        //}

        //if (Math.random() < 0 /*this.spawnChancePowerup*/) {
        //    let powerupstring = '';
        //    let poweruptype = this.getRandomInt(0,2);

        //    switch (poweruptype) {
        //        case 0: powerupstring = 'healthbox'; break;

        //        case 1: powerupstring = 'speed'; break;
 
        //        case 2: powerupstring = 'bullets'; break;
        //    }

        //    let powerup = new Powerups(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, 0, powerupstring)
        //    this.powerups.add(powerup);
        //}

        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
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

        //this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets2, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets3, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets4, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        //this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        //this.physics.arcade.overlap(this.player, this.powerups, this.obtainPowerup, null, this)

        //console.log('health: ' + this.player.playerModel.health);

        if (this.player.playerModel.health <= 0) {
            this.game.sound.stopAll();
            this.game.state.start('gameOverSad')
        }
    }

    //incrementWave() {
    //    this.spawnChance *= 1.2;
    //}

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
    }

    damageEnemy(enemy, projectile) {
        enemy.kill();
        projectile.kill();
        var x = enemy.body.x;
        var y = enemy.body.y;
        delete enemy.type; // Probs a better way of doing this

        var dropsHeart = Phaser.Utils.chanceRoll(100);
        if (dropsHeart) {
            //var tree = this.trees.create(x, y, 'tree');
            var heart = this.hearts.create(x, y, 'heart');
            this.physics.arcade.enableBody(heart);
        }
    }

    deflectEnemyBullets(enemyBullet, projectile) {
        console.log("projectile.direction: " + projectile.direction);
        console.log("(enemyBullet.body.velocity.x,enemyBullet.body.velocity.y): (" + enemyBullet.body.velocity.x + "," + enemyBullet.body.velocity.y +")");
        switch (projectile.directionn) {
            case 'right':
            case 'left':
                enemyBullet.body.velocity.x = -enemyBullet.body.velocity.x;
                break;
            case 'up':
            case 'normal':
                enemyBullet.body.velocity.y = -enemyBullet.body.velocity.y;
                break;
            default: { break; }
            
        }

        console.log("(enemyBullet.body.velocity.x,enemyBullet.body.velocity.y) (" + enemyBullet.body.velocity.x + "," + enemyBullet.body.velocity.y + ")");

        //if (enemyBullet.body.velocity.y > 0)
            //enemyBullet.body.velocity.y = -enemyBullet.body.velocity.y
        projectile.kill();
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
    
    //damagePlayer(playerRef, enemyRef) {
    //    this.player.damage(1);
    //    this.healthBar.setValue(this.player.playerModel.health / this.player.playerModel.max_health);
    //    enemyRef.kill();

    //    if (this.player.playerModel.health <= 0) {
    //        this.game.state.start('gameOver');
    //    }
    //}

    //damageEnemy(enemy, bullet) {

    //    this.explosions.x = enemy.x;
    //    this.explosions.y = enemy.y;

    //    this.explosions.explode(2000, 4);

    //    enemy.kill();
    //    bullet.kill();

    //    this.score++;
    //    this.scoreField.setValue(this.score);
    //}

    //obtainPowerup(playerRef, powerup)
    //{
    //    if (powerup.type === 'healthbox') {
    //        this.player.heal(100);
    //        this.healthBar.setValue(this.player.playerModel.health / this.player.playerModel.max_health);
    //    }
    //    else if (powerup.type === 'speed') {
    //        this.player.playerModel.max_speed += 100;
    //    }
    //    else if (powerup.type === 'bullets') {
    //        this.player.playerModel.gun.addBullets(10);
    //    }
    //    else {

    //    }

    //    powerup.kill();
    //}

    
    //getRandomInt(min, max) {
    //    return Math.floor(Math.random() * (max - min + 1)) + min;
    //}
}