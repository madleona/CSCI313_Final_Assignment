export default class Preload {

    constructor() {
        this.asset = null;
        this.ready = false;
    }

    preload() {
        console.log('In Preload.js');

        //task We may need a different loading_bg based on the size our game is going to be
        //task cause I think it should be bigger than the size of the shooter game we're using as a template
        this.load.image('loading_bg', 'images/loading_bg.jpg');
        this.load.image('princess_default', 'images/princess.png');
        this.load.image('princess_left', 'images/princess_left_arrow.png');
        this.load.image('princess_right', 'images/princess_right_arrow.png');
        this.load.image('princess_up', 'images/princess_up_arrow.png');
        this.load.image('enemy', 'images/temp_enemy.png');
        this.load.image('level1', 'images/level_1_map.png');
        this.load.image('level2', 'images/level_2_map.png');
        this.load.image('level3', 'images/level_3_map.png');
        this.load.image('game_over_happy', 'images/game_over_happy.png');
        this.load.image('game_over_sad', 'images/game_over_sad.png');
        this.load.image('rabbit', 'images/rabbit.png');
        this.load.image('mushroom', 'images/mushroom.png');
        this.load.image('dragon', 'images/dragon.png');
        this.load.image('orb', 'images/orb.png');
        this.load.image('fireball', 'images/fireball.png');
    }

    create() {
        this.add.sprite(0, 0, "loading_bg");

        //! I think this is the code for the loading bar graphic? Not sure though. Leaving it anyways - Madelyn
        this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

        //task Load in graphics here, use the following commented code as examples.
        //this.load.image('player', 'assets/images/player.png'); //width and height of sprite
        //this.load.image('enemy', 'assets/images/enemy.png');
        //this.load.image('explosion', 'assets/images/explosion.png');
        //this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
        //this.load.image('hexagon', 'assets/images/hexagon_particle.png');
        //this.load.image('bullet', 'assets/images/bullet.png');
        //this.load.image('bullet2', 'assets/images/bullet2.png');
        //this.load.image('bullet3', 'assets/images/bullet3.png');
        //this.load.image('bullet4', 'assets/images/bullet4.png');
        //this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
        //this.load.image('bg', 'assets/images/bg.jpg');
        //this.load.image('health_bar', 'assets/images/health_bar.png');
        //this.load.image('health_holder', 'assets/images/health_holder.png');
        //this.load.image('healthbox', 'assets/images/healthbox.png');
        //this.load.image('circle', 'assets/images/circle.png');
        
        this.load.start();
    }

    update() {

        if (this.ready) {
            console.log('Leaving Preload.js');
            this.game.state.start('startScreen');
        }

    }

    onLoadComplete() {
        this.ready = true;
    }

}