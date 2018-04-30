export default class Boot {

    preload() {
        console.log('In Boot.js');
    }

    create() {
        this.game.input.maxPointers = 1;

        console.log('Leaving Boot.js');
        this.game.state.start('preload');
    }

}