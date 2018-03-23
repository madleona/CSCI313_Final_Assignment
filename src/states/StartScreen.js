export default class StartScreen {


    create() {
        //task Add epilogue text, explaining how the Prince got taken by a Dragon and now the Princess has set off on a journey to save him
        //task Use the following code as an example on how to set text
        //var style = { font: "75px Comic Sans MS", fill: "#FFFFFF" };
        //this.game.add.text(125, 225, "Press Spacebar to Play", style);

        //task Add some rpg-like music

        console.log('In StartScreen.js, Press SPACEBAR to progress to Level1.js');
    }

    update() {
        //task If we wanted to be fancy we could have it read off one line of text at a time, using SPACEBAR to progress to the next line of text
        //task Until you get to the end of the text, then SPACEBAR will take you to Level1

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving StartScreen.js')
            this.game.state.start('level1');
        }
    }

}