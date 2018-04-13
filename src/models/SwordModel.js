export default class SwordModel
{
    constructor()
    {
        this.lastSwing = Date.now() - 500; //So that we can fire the gun
    }

    attack()
    {
        this.lastSwing = Date.now();
        console.log('attack');
    }

    canBeSwung()
    {
        if (Date.now() - this.lastSwing >= 500) {
            return true;
        } else {
            return false;
        }
    }
}