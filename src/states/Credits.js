export default class Credits {
    
    create() {
        var style = { font: "12px Comic Sans MS", fill: "#FFFFFF" };
        this.game.add.text(16, 20, '"The Herd and Nest System" by Spring', style);
        this.game.add.text(16, 35, 'is licensed under CC-BY 4.0', style);
        this.game.add.text(16, 50, 'https://opengameart.org/content/', style);
        this.game.add.text(16, 65, 'the-herd-and-nest-system', style);

        this.game.add.text(16, 95, '"Lose Music #3" by remaxim', style);
        this.game.add.text(16, 110, 'is licensed under CC-BY-SA 3.0', style);
        this.game.add.text(16, 125, 'https://opengameart.org/content/lose-music-3', style);

        this.game.add.text(16, 155, '"Breaking Bottle" by spookymodem', style);
        this.game.add.text(16, 170, 'is licensed under CC-BY 3.0', style);
        this.game.add.text(16, 185, 'https://opengameart.org/content/breaking-bottle', style);

        this.game.add.text(16, 215, '"Battle! vs Minor Gyokaijuu" by Spring', style);
        this.game.add.text(16, 230, 'is licensed under CC0', style);
        this.game.add.text(16, 245, 'https://opengameart.org/content/', style);
        this.game.add.text(16, 260, 'battle-vs-minor-gyokaijuu', style);

        this.game.add.text(16, 290, '"Sunny Side Up 2" by Amac1990', style);
        this.game.add.text(16, 305, 'is licensed under CC0', style);
        this.game.add.text(16, 320, 'https://opengameart.org/content/sunny-side-up-2', style);

        this.game.add.text(16, 350, '"Magic Tales" by KLY', style);
        this.game.add.text(16, 365, 'is licensed under CC-BY 3.0', style);
        this.game.add.text(16, 380, 'https://opengameart.org/content/magic-tales-set', style);

        this.game.add.text(16, 410, '"Castle Town" by Will Carpenter', style);
        this.game.add.text(16, 425, 'is licensed under CC0', style);
        this.game.add.text(16, 440, 'https://opengameart.org/content/castle-town', style);

        this.game.add.text(16, 470, '"Magic Chime 2" by Sound Jay', style);
        this.game.add.text(16, 485, 'is licensed under CC-BY 3.0', style);
        this.game.add.text(16, 500, 'https://www.soundjay.com/magic-sound-effect.html', style);

        this.game.add.text(16, 530, 'All art assets by Madelyn Leonard', style);
        this.game.add.text(16, 545, 'are licensed under CC0', style);

        var style2 = { font: "16px Comic Sans MS", fill: "#FFFFFF" };
        this.game.add.text(20, 585, "Press [C] to return to", style2);
        this.game.add.text(20, 605, "the start screen", style2);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            this.game.state.start('startScreen')
        }
    }
}
