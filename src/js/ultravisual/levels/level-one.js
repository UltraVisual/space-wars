define(['ultravisual/entities/space-ship'], function (SpaceShip) {
    var game, spaceShip;
    var LevelOne = function (_game) {
        game = _game;
    }

    LevelOne.prototype = {
        init: function () {

        },
        create: function () {
            if (!spaceShip) {
                spaceShip = new SpaceShip(game);
                spaceShip.create();
            }
        },
        update: function () {
            spaceShip.update();
        },
        render: function () {

        }
    };

    return LevelOne;
});