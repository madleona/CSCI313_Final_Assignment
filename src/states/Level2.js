import Enemy from "../prefabs/Enemy.js";

export default class Level2 extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 300, 700, 'level2');
        console.log("In Level2.js, press SPACEBAR to progress to Level3.js")

        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        let enemy = new Enemy(this.game, 100, 100, 'mushroom', this.enemyBullets);
        this.enemies.add(enemy);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log('Leaving Level2.js')
            this.game.state.start('level3');
        }
    }
}
