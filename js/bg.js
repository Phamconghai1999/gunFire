class background{
    constructor(game) {
        this.game = game;
    }

    init() {

    }

    loop() {

    }

    update() {

    }

    draw() {
        this.game.context.beginPath();
		this.game.context.fillStyle = "#000000";
		this.game.context.fillRect(0,GAME_HEIGHT - BASE_LINE,GAME_WIDTH, GAME_HEIGHT);
		this.game.context.fill();
        this.game.context.stroke();
    }
}