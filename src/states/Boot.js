export default class Boot {

    create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }

}