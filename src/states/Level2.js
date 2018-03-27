export default class Level2 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        console.log("In Level2.js, press SPACEBAR to progress to Level3.js")
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level2.js')
            this.game.state.start('level3');
        }
    }
}
