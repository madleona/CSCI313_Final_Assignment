import SwordModel from "../src/models/SwordModel.js";

describe("Sword Model", function () {
    let assert = chai.assert;

    it("Can be created", function () {
        let model = new SwordModel();
        assert.isOk(true);
    });

    //! Below is the code from the previous GunModel class. You might be able to reuse some of the tests. 
    //! Delete the comments when you're done. 

    //it('initially has 10 bullets with maximum capacity of 10', function () {
    //    let model = new GunModel();
    //    assert.equal(model.bullets, 10);
    //    assert.equal(model.max_bullets, 10);
    //});

    //it('initially has 5 bullets2 with maximum capacity of 5', function () {
    //    let model = new GunModel();
    //    assert.equal(model.bullets2, 5);
    //    assert.equal(model.max_bullets2, 5);
    //});

    //it('initially has 2 bullets3 with maximum capacity of 2', function () {
    //    let model = new GunModel();
    //    assert.equal(model.bullets3, 2);
    //    assert.equal(model.max_bullets3, 2);
    //});

    //it('initially has 1 bullets4 with maximum capacity of 1', function () {
    //    let model = new GunModel();
    //    assert.equal(model.bullets4, 1);
    //    assert.equal(model.max_bullets4, 1);
    //});

    //it('removes one bullet when fired', function () {
    //    let model = new GunModel();
    //    model.fire();
    //    assert.equal(model.bullets, 9);
    //});

    //it('removes one bullet2 when fired', function () {
    //    let model = new GunModel();
    //    model.fire2();
    //    assert.equal(model.bullets2, 4);
    //});

    //it('removes one bullet3 when fired', function () {
    //    let model = new GunModel();
    //    model.fire3();
    //    assert.equal(model.bullets3, 1);
    //});

    //it('removes one bullet4 when fired', function () {
    //    let model = new GunModel();
    //    model.fire4();
    //    assert.equal(model.bullets4, 0);
    //});

    //it('has a method to check to see if it can be fired', function () {
    //    let model = new GunModel();
    //    assert.equal(model.canBeFired(), true);
    //});

    //it('fire can not be fired again if it has been fired immediately before', function () {
    //    let model = new GunModel();
    //    model.fire();
    //    assert.equal(model.canBeFired(), false);
    //});

    //it('fire2 can not be fired again if it has been fired immediately before', function () {
    //    let model = new GunModel();
    //    model.fire2();
    //    assert.equal(model.canBeFired(), false);
    //});

    //it('fire3 can not be fired again if it has been fired immediately before', function () {
    //    let model = new GunModel();
    //    model.fire3();
    //    assert.equal(model.canBeFired(), false);
    //});

    //it('fire4 can not be fired again if it has been fired immediately before', function () {
    //    let model = new GunModel();
    //    model.fire4();
    //    assert.equal(model.canBeFired(), false);
    //});

    //it('fire can be fired 500 milliseconds after the last firing', function () {
    //    let clock = sinon.useFakeTimers();
    //    let model = new GunModel();
    //    model.fire();
    //    //Stub the clock ahead by 500 milliseconds
    //    clock.tick(500);

    //    assert.equal(model.canBeFired(), true);
    //    clock.restore()
    //});

    //it('fire2 can be fired 500 milliseconds after the last firing', function () {
    //    let clock = sinon.useFakeTimers();
    //    let model = new GunModel();
    //    model.fire2();
    //    //Stub the clock ahead by 500 milliseconds
    //    clock.tick(500);

    //    assert.equal(model.canBeFired(), true);
    //    clock.restore()
    //});

    //it('fire3 can be fired 500 milliseconds after the last firing', function () {
    //    let clock = sinon.useFakeTimers();
    //    let model = new GunModel();
    //    model.fire3();
    //    //Stub the clock ahead by 500 milliseconds
    //    clock.tick(500);

    //    assert.equal(model.canBeFired(), true);
    //    clock.restore()
    //});

    //it('fire4 can be fired 500 milliseconds after the last firing', function () {
    //    let clock = sinon.useFakeTimers();
    //    let model = new GunModel();
    //    model.fire4();
    //    //Stub the clock ahead by 500 milliseconds
    //    clock.tick(500);

    //    assert.equal(model.canBeFired(), true);
    //    clock.restore()
    //});

    //if ('bullet cannot be fired if max_bullet = 0', function () {
    //    let model = new GunModel();
    //    model.bullets = 0;
    //    assert.equal(model.canBeFired(), false);
    //});


});