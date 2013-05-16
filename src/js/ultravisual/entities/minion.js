define(["phaser"], function (Phaser) {

    var game, graphics;

    var Minion = function (_game) {
        game = _game;
        graphics = game.createSprite(game.stage.width * .5 - 50, 200, "entities")
    }

    Minion.prototype = {
        create: function () {
            graphics.drag.x = 900;
            graphics.maxVelocity.x = 250;
            graphics.drag.y = 900;
            graphics.maxVelocity.y = 250;
            graphics.animations.add('fly', ['minion.png'], 1, true, false);
            graphics.animations.play('fly');
        },
        update:function(){

        }
    };

    return Minion;
});