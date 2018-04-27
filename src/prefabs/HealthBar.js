export default class HealthBar extends Phaser.Group {

    constructor(game, x, y) {
        super(game);

        this.game = game;
        this.x = x;
        this.y = y;

        this.fullHeart = 'heart';
        this.emptyHeart = 'empty_heart';

        this.hearts = [this.game.add.image(this.x, this.y, this.fullHeart),
                       this.game.add.image(this.x + 30, this.y, this.fullHeart),
                       this.game.add.image(this.x + 60, this.y, this.fullHeart)];

        this.lives = 3;
    }

    loseLife() {
        this.lives -= 1;
        this.hearts[this.lives].destroy();
        this.hearts[this.lives] = this.game.add.image(this.x + (30 * this.lives), this.y, this.emptyHeart);
    }

    addLife() {

    }

    livesLeft() {
        return this.lives;
    }

}