export default class Level3 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        console.log("In Level3.js, press SPACEBAR to progress to GameOverHappy.js, or press D (for Dead) to progress to GameOverSad.js");
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level3.js to GameOverHappy.js')
            this.game.state.start('gameOverHappy');
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            console.log('Leaving Level3.js to GameOverSad.js')
            this.game.state.start('gameOverSad');
        }
    }
}
