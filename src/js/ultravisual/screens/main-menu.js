define(["ultravisual/levels/level-one"], function (LevelOne) {
    var game, hasClicked = false;
    var MainMenu = function (_game) {
        game = _game;
    }

    MainMenu.prototype = {
        init: function () {
            game.camera.backgroundColor = 'rgb(95,95,95)';
            game.loader.addImageFile('main-title', 'media/title.png');
            game.loader.load();
        },
        create: function () {
            game.createSprite(0, 0, 'main-title');
        },
        update: function () {
            if (game.input.mouse.isDown && hasClicked === false){
                hasClicked = true;
                game.switchState(LevelOne)
            }
        },
        render: function () {

        }
    };

    return MainMenu
});