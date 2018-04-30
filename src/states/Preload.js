export default class Preload {

    constructor() {
        this.asset = null;
        this.ready = false;
    }

    preload() {
        console.log('In Preload.js');
        
        this.load.image('princess_default', 'images/princess.png');
        this.load.image('princess_left', 'images/princess_left_arrow.png');
        this.load.image('princess_right', 'images/princess_right_arrow.png');
        this.load.image('princess_up', 'images/princess_up_arrow.png');

        this.load.image('princess_up_attack', 'images/princess_up_attack.png');
        this.load.image('princess_left_attack', 'images/princess_left_attack.png');
        this.load.image('princess_right_attack', 'images/princess_right_arrow.png');
        this.load.image('princess_default_attack', 'images/princess_down_attack.png');

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
        this.load.image('heart', 'images/heart.png');
        this.load.image('empty_heart', 'images/empty_heart.png');
        this.load.image('sparkle', 'images/sparkle.png');

        this.load.image('tree', 'images/tree.png');
        this.load.image('pot', 'images/pot.png');
        this.load.image('fence', 'images/fence.png');

        this.load.audio('startscreen_music', 'music/magic_tales.mp3');
        this.load.audio('level_1_music', 'music/sunny_side_up_2.mp3');
        this.load.audio('level_2_music', 'music/the_herd_and_the_nest_system.ogg');
        this.load.audio('level_3_music', 'music/battle_vs_gyokaijuu.ogg');
        this.load.audio('good_ending_music', 'music/castle_town.mp3');
        this.load.audio('bad_ending_music', 'music/lose_music.wav');
        this.load.audio('attack_sound', 'music/magic_chime_2.mp3');
        this.load.audio('bottle_sound', 'music/bottle_break.wav');
    }

    create() {

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

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