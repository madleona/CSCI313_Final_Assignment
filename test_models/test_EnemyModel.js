import EnemyModel from "../src/models/EnemyModel.js";

describe('Enemy', function () {
    let assert = chai.assert;
    let expect = chai.expect;

    it('Can be created', function () {
        let model = new EnemyModel();
        assert.isOk(true);
    });

    it('rabbit has -100 xVelocity', function () {
        let model = new EnemyModel('rabbit');
        assert.equal(model.xVelocity, -100);
    });

    it('rabbit has 1 life', function () {
        let model = new EnemyModel('rabbit');
        assert.equal(model.lives, 1);
    });

    it('mushroom has 0 xVelocity', function () {
        let model = new EnemyModel('mushroom');
        assert.equal(model.xVelocity, 0);
    });

    it('mushroom has 2 lives', function () {
        let model = new EnemyModel('mushroom');
        assert.equal(model.lives, 2);
    });

    it('dragon has 0 xVelocity', function () {
        let model = new EnemyModel('dragon');
        assert.equal(model.xVelocity, 0);
    });

    it('dragon has 3 lives', function () {
        let model = new EnemyModel('dragon');
        assert.equal(model.lives, 3);
    });

    it('must be a rabbit, mushroom, or dragon', function () {
        var fcn = function () { new EnemyModel('aaa') };
        expect(fcn).to.throw(Error, 'Enemy must be a rabbit, mushroom, or dragon.');
    });

    it('cannot have a negative health', function () {
        let model = new EnemyModel();
        model.damage(1000);
        assert.equal(model.lives, 0);
    });

    it('changes negative damage values to 0', function () {
        let model = new EnemyModel();
        var initialLives = model.lives;
        model.damage(-1);
        assert.equal(model.lives, initialLives);
    })
});
