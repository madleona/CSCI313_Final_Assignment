export default class SwordModel
{
    constructor()
    {
        this.projectiles = 10;
        this.lastSwing = Date.now() - 2000; //So that we c swing the sword
    }

    attack()
    {
        this.lastSwing = Date.now();
        //this.projectiles -= 1;
    }

    canBeSwung(swingReset)
    {
        if (Date.now() - this.lastSwing - 1000 >= 500 && swingReset) {
            return true;
        } else {
            return false;
        }
    }
}