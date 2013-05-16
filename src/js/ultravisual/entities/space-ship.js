define(["phaser"], function (Phaser) {

    var game, graphics, fire = false, bulletGroup = null, shotDelayTime = 0, shotDelay = 50,
        frames = ['0001.png', '0002.png', '0003.png', '0004.png', '0005.png', '0006.png', '0007.png', '0008.png', '0009.png', '0010.png', '0011.png', '0012.png', '0013.png', '0014.png',
        '0015.png', '0016.png', '0017.png', '0018.png', '0019.png', '0020.png', '0021.png', '0022.png', '0023.png', '0024.png', '0025.png', '0026.png', '0027.png', '0028.png', '0029.png'];
    ;

    var createBullet = function () {
        bulletGroup = game.createGroup(10);
        var bullet = bulletGroup.recycle(Phaser.Sprite);
        bullet.exists = true;
        bullet.x = graphics.x + (graphics.width * 0.5);
        bullet.y = graphics.y + 25;
        bullet.velocity.x = 600;
        bullet.loadGraphic("entities");
        bullet.animations.frameName = "bullet.png";
    }

    var SpaceShip = function (_game) {
        game = _game;
        graphics = game.createSprite(game.stage.width * .5 - 50, 200, "entities")
    };

    SpaceShip.prototype = {
        create: function () {
            graphics.drag.x = 900;
            graphics.maxVelocity.x = 250;
            graphics.drag.y = 900;
            graphics.maxVelocity.y = 250;
            graphics.animations.add('fly', frames, 27, true, false);
            graphics.animations.play('fly');
        },
        update: function () {
            var keyboard = game.input.keyboard;
            if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                graphics.acceleration.x += 100;
            } else if (keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
                graphics.acceleration.x = 0;
            }
            if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
                graphics.acceleration.x -= 30;
            } else if (keyboard.justReleased(Phaser.Keyboard.LEFT)) {
                graphics.acceleration.x = 0;
            }
            if (keyboard.isDown(Phaser.Keyboard.UP)) {
                graphics.acceleration.y -= 20;
            } else if (keyboard.justReleased(Phaser.Keyboard.UP)) {
                graphics.acceleration.y = 0;
            }
            if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
                graphics.acceleration.y += 20;
            } else if (keyboard.justReleased(Phaser.Keyboard.DOWN)) {
                graphics.acceleration.y = 0;
            }

            if (keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                fire = true;
            } else if (keyboard.justReleased(Phaser.Keyboard.SPACEBAR)) {
                fire = false;
            }

            if (fire) {
                shotDelayTime += game.time.delta;
                if (shotDelayTime > shotDelay) {
                    createBullet();
                    shotDelayTime = 0;
                }
            }
        }
    }

    return SpaceShip;
});
