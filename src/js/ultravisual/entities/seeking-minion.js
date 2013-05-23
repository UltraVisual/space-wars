define(["phaser", "ultravisual/geom/vector2d"], function (Phaser, Vector2D) {

    var SimpleMinion = function (_game, _spaceShip) {
        this.game = _game;
        this.spaceShip = _spaceShip;
        this.graphics = this.game.createSprite(this.game.stage.width * .5 + Math.random() * 200, Math.random() * 400, "entities");
        this.position = new Vector2D(this.graphics.x, this.graphics.y)
        this.maxSpeed = 10;
        this.maxForce = 1;
        this.mass = 1.0;
        this.steeringForce = new Vector2D();
        this.velocity = new Vector2D();
        this.frames = ['0030.png', '0031.png', '0032.png', '0033.png', '0034.png', '0035.png',
            '0036.png', '0037.png', '0038.png', '0039.png', '0040.png', '0041.png', '0042.png', '0043.png',
            '0044.png', '0045.png', '0046.png', '0047.png', '0048.png', '0049.png', '0050.png', '0051.png',
            '0052.png', '0053.png', '0054.png', '0055.png', '0056.png', '0057.png', '0058.png', '0059.png'];
        this.create();
    }

    SimpleMinion.prototype = {
        create: function () {
            this.graphics.drag.x = 900;
            this.graphics.maxVelocity.x = 250;
            this.graphics.drag.y = 900;
            this.graphics.maxVelocity.y = 250;
            this.graphics.animations.add('fly', this.frames, 30, true, false);
            this.graphics.animations.play('fly');
        },
        pursue: function (target) {
            var targetPosition = target.getPosition();
            var targetVelocity = target.getVelocity();
            return this.seek(targetPosition.add(
                new Vector2D(targetVelocity.x, targetVelocity.y).multiply(this.getPosition().dist(targetPosition) / this.maxSpeed)
            ));
        },
        seek: function (target) {
            return this.steeringForce.add(target.subtract(this.getPosition()).normalise().multiply(this.maxSpeed).subtract(this.getVelocity()));
        },
        update: function () {
            this.steeringForce = this.pursue(this.spaceShip).truncate(this.maxForce).divide(this.mass);
            this.velocity = this.velocity.add(this.steeringForce).truncate(this.maxSpeed);
            this.position = this.position.add(this.velocity);
            this.graphics.x = this.position.getX();
            this.graphics.y = this.position.getY();
            this.steeringForce = this.steeringForce.zero();
        },
        getVelocity: function () {
            return new Vector2D(this.graphics.acceleration.x, this.graphics.acceleration.y);
        },
        getPosition: function () {
            return new Vector2D(this.graphics.x, this.graphics.y)
        }
    };

    return SimpleMinion;
});