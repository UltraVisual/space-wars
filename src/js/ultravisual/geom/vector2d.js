define(function () {
    var Vector2D = function (_x, _y) {
        this.x = _x || 0;
        this.y = _y || 0;
        return this;
    }

    Vector2D.prototype = {
        zero: function () {
            this.x = 0;
            this.y = 0;
            return this;
        },
        clone: function () {
            return new Vector2D(this.x, this.y)
        },
        setLength: function (value) {
            this.x = Math.cos(this.getAngle()) * value;
            this.y = Math.sin(this.getAngle()) * value;
            return this;
        },
        getLength: function () {
            return Math.sqrt(this.getLengthSQ())
        },
        getLengthSQ: function () {
            return this.x * this.x + this.y * this.y;
        },
        setAngle: function (value) {
            var len = this.getLength();
            this.x = Math.cos(value) * len;
            this.y = Math.sin(value) * len;
        },
        getAngle: function () {
            return Math.atan2(this.y, this.x);
        },
        normalise: function () {
            if (this.getLength() === 0) {
                this.x = 1;
                return this;
            }
            var len = this.getLength();
            this.x /= len;
            this.y /= len;
            return this;
        },
        truncate: function (max) {
            return this.setLength(Math.min(max, this.getLength()));
        },
        dotProd: function (vector) {
            return this.x * vector.getX() + this.y * vector.getY();
        },
        reverse: function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        },
        isNormalised: function () {
            return this.getLength() === 1.0;
        },
        getAngleBetween: function (vectorOne, vectorTwo) {
            if (!vectorOne.isNormalised()) {
                vectorOne = vectorOne.clone().normalise();
            }
            if (!vectorTwo.isNormalised()) {
                vectorTwo = vectorTwo.clone().normalise();
            }
            return Math.acos(vectorOne.dotProd(vectorTwo))
        },
        sign: function (vector) {
            return this.getPerp().dotProd(vector) < 0 ? -1 : 1;
        },
        getPerp: function () {
            return new Vector2D(-this.y, this.x);
        },
        dist: function (vector) {
            return  Math.sqrt(this.getDistSQ(vector))
        },
        getDistSQ: function (vector) {
            var dx = vector.getX() - this.x;
            var dy = vector.getY() - this.y;
            return dx * dx + dy * dy;
        },
        add: function (vector) {
            return new Vector2D(this.x + vector.getX(), this.y + vector.getY());
        },
        subtract: function (vector) {
            return new Vector2D(this.x - vector.getX(), this.y - vector.getY());
        },
        multiply: function (value) {
            return new Vector2D(this.x * value, this.y * value);
        },
        divide: function (value) {
            return new Vector2D(this.x / value, this.y / value);
        },
        equals: function (vector) {
            return (this.x === vector.getX() && this.y === vector.getY());
        },
        getX: function () {
            return this.x;
        },
        getY: function () {
            return this.y;
        },
        toString: function () {
            return "[Vector2D (x:" + this.x + ", y:" + this.y + ")]";
        }
    };
    return Vector2D;
});