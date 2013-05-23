define(["phaser", "ultravisual/geom/vector2d"], function (Phaser, Vector2D) {

    var MarchingMinion = function (_game, _spaceShip) {
        this.game = _game;
        this.spaceShip = _spaceShip;
        this.graphics = this.game.createSprite(this.game.stage.width + 200, Math.random() * 400, "entities");
        this.speed = 5;
        this.frames = ['0030.png', '0031.png', '0032.png', '0033.png', '0034.png', '0035.png',
            '0036.png', '0037.png', '0038.png', '0039.png', '0040.png', '0041.png', '0042.png', '0043.png',
            '0044.png', '0045.png', '0046.png', '0047.png', '0048.png', '0049.png', '0050.png', '0051.png',
            '0052.png', '0053.png', '0054.png', '0055.png', '0056.png', '0057.png', '0058.png', '0059.png'];
        this.create();
    }

    MarchingMinion.prototype = {
        create: function () {
            this.graphics.drag.x = 900;
            this.graphics.maxVelocity.x = 250;
            this.graphics.drag.y = 900;
            this.graphics.maxVelocity.y = 250;
            this.graphics.animations.add('fly', this.frames, 30, true, false);
            this.graphics.animations.play('fly');
        },
        update: function () {
            this.graphics.x -= this.speed;
        }
    };

    return MarchingMinion;
});