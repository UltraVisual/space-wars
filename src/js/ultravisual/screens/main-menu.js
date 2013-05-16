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
            var createSprite = game.createSprite(800, 480, 'main-title');
            console.log("Shane: main-menu.js :: create :: createSprite", createSprite);
        },
        update: function () {
            if (game.input.mouse.isDown && hasClicked == false){
                console.log("Shane: main-menu.js :: update :: hasClicked", hasClicked);
                hasClicked = true;
                game.switchState(LevelOne)
            }
        },
        render: function () {

        }
    };

    return MainMenu
});