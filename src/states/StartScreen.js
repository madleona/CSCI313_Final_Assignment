export default class StartScreen {

    constructor() {
        var musicIsPlaying = false;
    }

    create() {
        console.log('In StartScreen.js');

        if (!this.musicIsPlaying) {
            this.playMusic();
        }

        var style = { font: "16px Comic Sans MS", fill: "#FFFFFF" };
        this.game.add.text(20, 20, "Once upon a time...", style);
        this.game.add.text(20, 50, "There lived a Prince and Princess", style);
        this.game.add.text(20, 70, "who lived happily in a magical land.", style);
        this.game.add.text(20, 100, "But one day, a dragon attacked their", style);
        this.game.add.text(20, 120, "castle, and kidnapped the Prince.", style);
        this.game.add.text(20, 150, "It was up to the Princess to save", style);
        this.game.add.text(20, 170, "him...", style);

        this.game.add.text(20, 270, "[UP ARROW] -- move forward", style);
        this.game.add.text(20, 290, "[LEFT ARROW] -- move left", style);
        this.game.add.text(20, 310, "[RIGHT ARROW] -- move right", style);
        this.game.add.text(20, 330, "[DOWN ARROW] -- move down", style);
        this.game.add.text(20, 350, "[SPACEBAR] -- attack", style);

        this.game.add.text(20, 390, "Press [C] to view the credits.", style);

        this.game.add.text(20, 430, "Press [SPACEBAR] to start playing!", style);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.sound.stopAll();
            console.log('Leaving StartScreen.js')
            this.game.state.start('level1');
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            this.game.state.start('credits')
        }
    }

    playMusic() {
        var music = this.game.add.audio('startscreen_music');
        music.play();
        music.loopFull();
        this.musicIsPlaying = true;
    }
}