import SwordModel from "./SwordModel.js";

export default class PlayerModel
{

    constructor(health = 100, max_health = 100) {
        this.max_speed = 200;
        this.health = health;
        this.max_health = max_health;
        this.sword = new SwordModel();
    }

    change_max_speed(amount)
    {
        if ((typeof amount) != "number") {
            throw new Error('Speed in PlayerModel.change_speed must be a number.');
        }
        if (amount < 0) {
            amount = 0;
        }
        this.max_speed = amount;
    }

    damage(amount)
    {
        if (amount < 0) {
            throw new Error('Negative damage not allowed in PlayerModel.');
        }
        this.health -= amount;
    }

    heal(amount)
    {
        if (amount < 0) {
            throw new Error('Negative heal not allowed in PlayerModel.');
        }
        this.health += amount;
        if (this.health > this.max_health) {
            this.health = this.max_health;
        }
    }

}