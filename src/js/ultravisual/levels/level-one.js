define(['ultravisual/entities/space-ship', 'ultravisual/entities/marching-minion', 'ultravisual/entities/seeking-minion'], function (SpaceShip, MarchingMinion, SeekingMinion) {
    var game, spaceShip, minions = [];
    var LevelOne = function (_game) {
        game = _game;
    }

    LevelOne.prototype = {
        _addMinion:function(){
           var minion = (Math.random() > 0.8) ? new SeekingMinion(game, spaceShip) : new MarchingMinion(game, spaceShip);
            minions.push(minion)
        },
        init: function () {

        },
        create: function () {
            if (!spaceShip) {
                spaceShip = new SpaceShip(game);
            }

            var self = this;

            function addEnemyEntity(){
                self._addMinion();
                setTimeout(function(){
                    addEnemyEntity();
                }, 5000)
            }

            addEnemyEntity();
        },
        update: function () {
            var self = this;
            spaceShip.update();
            self.checkCollisions(spaceShip, minions, self);
            this.updateMinions();

        },
        updateMinions:function(){
            for(var i = 0; i < minions.length; i++){
                if(minions[i].x < 0){
                    minions.shift();
                }
                else{
                    minions[i].update();
                }
            }
        },
        render: function () {

        },
        collision:function(){
        },
        checkCollisions:function(targetSingle, targetLots, self){
            for(var i = 0; i < targetLots.length; i++){
                game.collide(targetSingle.graphics, targetLots[i].graphics, self.collision);

            }
        }
    };

    return LevelOne;
});