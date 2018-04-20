export default class GameOverSad {

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'game_over_sad');
        console.log('In GameOverSad.js, press L to go back to Level3.js');
    }

    update() {
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            console.log('Leaving GameOverSad.js');
            this.game.state.start('level3');
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            console.log('Leaving GameOverSad.js');
            this.game.state.start('level1');
        }
        
    }

}
