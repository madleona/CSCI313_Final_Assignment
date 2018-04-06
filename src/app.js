var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Level1 from "./states/Level1.js";
import Level2 from "./states/Level2.js";
import Level3 from "./states/Level3.js";
import StartScreen from "./states/StartScreen.js";
import GameOverHappy from "./states/GameOverHappy.js";
import GameOverSad from "./states/GameOverSad.js";


window.onload = function () {
    game = new Phaser.Game(1024, 768, Phaser.AUTO, 'canvasContainer');
    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('startScreen', StartScreen);
    game.state.add('level1', Level1);
    game.state.add('level2', Level2);
    game.state.add('level3', Level3);
    game.state.add('gameOverHappy', GameOverHappy);
    game.state.add('gameOverSad', GameOverSad);
    game.state.start('boot');
};
