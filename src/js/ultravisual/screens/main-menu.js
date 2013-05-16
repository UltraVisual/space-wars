define(["ultravisual/levels/level-one"], function (LevelOne) {
    var game;
    var MainMenu = function (_game) {
        game = _game;
    }

    MainMenu.prototype = {
        init: function () {
            game.switchState(LevelOne)
        },
        create: function () {

        },
        update: function () {

        },
        render: function () {

        }
    };

    return MainMenu
});