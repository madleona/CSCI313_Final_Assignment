export default class HealthBar extends Phaser.Group {

    constructor(game, x, y, lives) {
        super(game);

        this.game = game;
        this.x = x;
        this.y = y;

        this.fullHeart = 'heart';
        this.emptyHeart = 'empty_heart';

        this.hearts = [null, null, null];



        for (var i = 0; i < this.game.lives; i++) {
            this.hearts[i] = this.game.add.image(this.x + 30 * i, this.y, this.fullHeart);
        }
        for (var i = this.game.lives; i < 3; i++) {
            this.hearts[i] = this.game.add.image(this.x + 30 * i, this.y, this.emptyHeart);
        }
        //this.hearts = [this.game.add.image(this.x, this.y, this.fullHeart),
        //               this.game.add.image(this.x + 30, this.y, this.fullHeart),
        //               this.game.add.image(this.x + 60, this.y, this.fullHeart)];

        this.lives = lives;
    }

    loseLife() {
        this.game.lives -= 1;
        this.lives = this.game.lives;
        this.hearts[this.lives].destroy();
        this.hearts[this.lives] = this.game.add.image(this.x + (30 * this.lives), this.y, this.emptyHeart);
    }

    addLife() {

    }

    livesLeft() {
        return this.lives;
    }

}