export default class EnemyModel
{
    constructor(type = 'rabbit')
    {
        this.lives;
        this.xVelocity;
        this.chanceOfShooting; // in percent

        if (type == 'rabbit') {
            this.lives = 1;
            this.xVelocity = -100;
            this.chanceOfShooting = 1;
        } else if (type == 'mushroom') {
            this.lives = 2;
            this.xVelocity = 0;
            this.chanceOfShooting = 2;
        } else if (type == 'dragon') {
            this.lives = 3;
            this.xVelocity = 0
            this.chanceOfShooting = 5;
        } else {
            throw new Error('Enemy must be a rabbit, mushroom, or dragon.');
        }
    }

    damage(amount) {
        if (amount < 0) { amount = 0; }
        // Just set lives to 0 if the damage > lives remaining
        this.lives = (amount > this.lives) ? 0 : this.lives - amount;
    }

    willFire() {
        return Phaser.Utils.chanceRoll(this.chanceOfShooting);
    }
}