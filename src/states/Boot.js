export default class Boot {

    preload() {
        console.log('In Boot.js');

        this.load.image('preloader', 'images/loading_bar.png');
    }

    create() {
        //! I honestly don't know what this does but I'm leaving it anyways - Madelyn
        this.game.input.maxPointers = 1;

        console.log('Leaving Boot.js');
        this.game.state.start('preload');
    }

}