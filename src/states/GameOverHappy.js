export default class GameOverHappy {

    constructor() {
        var musicIsPlaying = false;
    }

    create() {
        if (!this.musicIsPlaying) {
            this.playMusic();
        }

        this.initializeText();
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            this.game.sound.stopAll();
            this.game.state.start('level1');
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            this.game.state.start('credits');
        }
    }

    playMusic() {
        var music = this.game.add.audio('good_ending_music');
        music.play();
        music.loopFull();
        this.musicIsPlaying = true;
    }

    initializeText() {
        var style = { font: "16px Comic Sans MS", fill: "#FFFFFF" };
        this.game.add.text(20, 20, "After the dragon was defeated", style);
        this.game.add.text(20, 50, "the Prince and Princess rejoiced!", style);
        this.game.add.text(20, 70, "Every year on that day, they would", style);
        this.game.add.text(20, 90, "hold a banquet at the castle to", style);
        this.game.add.text(20, 110, "celebrate the day the Princess", style);
        this.game.add.text(20, 130, "showed her bravery and strength.", style);

        this.game.add.text(20, 170, "Since then, everyone lived", style);
        this.game.add.text(20, 190, "happily ever after.", style);

        this.game.add.text(20, 300, "Press [P] to play again", style);

        this.game.add.text(20, 340, "Press [C] to view the credits", style);
    }
}