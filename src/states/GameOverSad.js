export default class GameOverSad {

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'game_over_sad');

        var music = this.game.add.audio('bad_ending_music');
        music.play();
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            this.game.sound.stopAll();
            this.game.state.start('level1');
        }
    }
}
