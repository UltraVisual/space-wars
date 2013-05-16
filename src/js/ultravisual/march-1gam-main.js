define(["phaser", "ultravisual/screens/main-menu"], function (Phaser, MainMenu) {
    var game = new Phaser.Game(this, 'game', 800, 480, init, create, update);

    function init() {
        game.loader.addTextureAtlas('entities', 'media/game-sprites.png', 'media/game-sprites.json');
        game.loader.load();
    }

    function create() {
        game.switchState(MainMenu)
    }

    function update() {

    }
});