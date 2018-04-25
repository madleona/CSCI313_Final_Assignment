export default class Heart extends Phaser.Group {

    constructor(game, x, y) {
        super(game);

        this.game = game;
        this.x = x;
        this.y = y;
        this.fullHeart = 'heart';
        this.emptyHeart = 'empty_heart';

        let heart = this.game.add.image(this.x, this.y, this.fullHeart);
        this.heart = heart;

        this.alive = true;
    }

    empty() {
        this.heart.destroy();
        this.heart = this.game.add.image(this.x, this.y, this.emptyHeart);
    }

    fill() {
        this.heart.destroy();
        this.heart = this.game.add.image(this.x, this.y, this.fullHeart);
    }

    isAlive() {
        return this.status;
    }

}