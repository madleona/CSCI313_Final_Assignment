export default class Credits {
    
    create() {
        var style = { font: "16px Comic Sans MS", fill: "#FFFFFF" };
        this.game.add.text(20, 390, "Press [C] to view the start screen.", style);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            this.game.state.start('startScreen')
        }
    }
}
