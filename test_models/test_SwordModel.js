import SwordModel from "../src/models/SwordModel.js";

describe("Sword Model", function () {
    let assert = chai.assert;

    it("Can be created", function () {
        let model = new SwordModel();
        assert.isOk(true);
    });

    //! Below is the code from the previous GunModel class. You might be able to reuse some of the tests. 
    //! Delete the comments when you're done. 

    it('initially has 10 projectiles', function () {
        let model = new SwordModel();
        assert.equal(model.projectiles, 10);
    });

    it('removes zero projectiles when swung (has infinte projectiles)', function () {
        let model = new SwordModel();
        model.attack();
        assert.equal(model.projectiles, 10);
    });


    it('has a method to check to see if it can be swung', function () {
        let model = new SwordModel();
        assert.equal(model.canBeSwung(true), true);
    });

    it('can not be swung again if it has been swung immediately before', function () {
        let model = new SwordModel();
        model.attack();
        assert.equal(model.canBeSwung(true), false);
    });

    it('can be swung 1500 milliseconds after the last swing', function () {
        let clock = sinon.useFakeTimers();
        let model = new SwordModel();
        model.attack();
        //Stub the clock ahead by 1500 milliseconds
        clock.tick(1500);

        assert.equal(model.canBeSwung(true), true);
        clock.restore()
    });
});