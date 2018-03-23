export default class GunModel_EXAMPLE {


    constructor(bullets = 10, bullets2 = 5, bullets3 = 2, bullets4 = 1, max_bullets = 10, max_bullets2 = 5, max_bullets3 = 2, max_bullets4 = 1) {
        this.bullets = bullets;
        this.bullets2 = bullets2;
        this.bullets3 = bullets3;
        this.bullets4 = bullets4;
        this.max_bullets = max_bullets;
        this.max_bullets2 = max_bullets2;
        this.max_bullets3 = max_bullets3;
        this.max_bullets4 = max_bullets4;
        this.lastFire = Date.now() - 500; //So that we can fire the gun
    }

    fire() {
        this.lastFire = Date.now();
        this.bullets -= 1;
    }

    fire2() {
        this.lastFire = Date.now();
        this.bullets2 -= 1;
    }

    fire3() {
        this.lastFire = Date.now();
        this.bullets3 -= 1;
    }

    fire4() {
        this.lastFire = Date.now();
        this.bullets4 -= 1;
    }

    addBullets(moreBullets) {
        this.bullets += moreBullets;

        if (this.bullets > this.max_bullets)
            this.bullets = this.max_bullets;
    }

    canBeFired() {
        if (Date.now() - this.lastFire >= 500 && this.bullets > 0) {
            return true;
        } else {
            return false;
        }
    }
}