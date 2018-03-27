export default class GameOverHappy {
    
    create() {
        console.log('In GameOverHappy.js, press L to go back to Level3.js');
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            console.log('Leaving GameOverHappy.js');
            this.game.state.start('level3');
        }
    }

}