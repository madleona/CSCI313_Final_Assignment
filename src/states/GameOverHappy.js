export default class GameOverHappy {
    
    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'game_over_happy');
        console.log('In GameOverHappy.js, press L to go back to Level3.js');

        var music = this.game.add.audio('good_ending_music');
        music.play();
        music.loopFull();
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            console.log('Leaving GameOverHappy.js');
            this.game.sound.stopAll();
            this.game.state.start('level3');
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            console.log('Leaving GameOverHappy.js');
            this.game.sound.stopAll();
            this.game.state.start('level1');
        }
    }

}