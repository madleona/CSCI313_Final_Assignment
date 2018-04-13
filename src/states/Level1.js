//require our other components
//task Import any dependencies for Level 1
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
//import NumberBox from "../prefabs/NumberBox.js";
//import HealthBar from "../prefabs/HealthBar.js";
//import Powerups from "../prefabs/Powerups.js"; 

//task Level 1 should contain the level 1 map, level 1 enemies, and level 1 items (for example, pots you can destroy and get health)
//task You progress to the next level by reaching the end of the level 1 map without dying

export default class Level1 extends Phaser.State {

    constructor() {
        //object level properties
        super();
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level1');

        console.log('In Level1.js, press SPACEBAR to progress to Level2.js');

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
        this.player = new Player(this.game, 126, 650);
        this.game.add.existing(this.player);

        ////add a few enemeis..
        //this.enemies = this.add.group();
        //for (let i = 0; i < 5; i++) {
        //    let enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
        //    this.enemies.add(enemy);
        //}

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'rabbit', this.enemyBullets);
        this.enemies.add(enemy);

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

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level1.js')
            this.game.state.start('level2');
        }

        //if the player is at the top of the level and within a certain x interval
        if (this.player.y < 17 && (180 <= this.player.x && this.player.x <= 200)) {
            console.log('Leaving Level1.js')
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

        //this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets2, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets3, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.enemies, this.bullets4, this.damageEnemy, null, this);
        //this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        //this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
        //this.physics.arcade.overlap(this.player, this.powerups, this.obtainPowerup, null, this)
    }

    //incrementWave() {
    //    this.spawnChance *= 1.2;
    //}

    damagePlayer(playerRef, enemyRef) {
        enemyRef.kill();
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