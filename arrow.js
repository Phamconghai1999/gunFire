class arrow {
    constructor(game){
        this.game = game;
        this.mousePos = {x: 0,y: 0};
        this.beginPos = {x:0,y:0};
        this.tanAlpha = null;
        this.len = 120;
    }

    setMousePos(newMousePos, newBeginPos){ // beginPos = center of gun
        //
        this.tanAlpha = (newBeginPos.y - newMousePos.y)/(newMousePos.x - newBeginPos.x);
		let LenArr = Math.sqrt(((newBeginPos.y - newMousePos.y)*(newBeginPos.y - newMousePos.y) + (newMousePos.x - newBeginPos.x)*(newMousePos.x - newBeginPos.x)));
        if (LenArr >= 400) LenArr = 400;
        this.len = LenArr/3;
        if (newMousePos.x > newBeginPos.x) {
			this.mousePos.x = this.len * Math.cos(Math.atan(this.tanAlpha)) + newBeginPos.x;
			this.mousePos.y = -(this.len * Math.sin(Math.atan(this.tanAlpha)) - newBeginPos.y);
		}
		else {
			this.mousePos.x = -(this.len * Math.cos(Math.atan(-this.tanAlpha)) - newBeginPos.x);
			this.mousePos.y = -(this.len * Math.sin(Math.atan(-this.tanAlpha)) - newBeginPos.y);
		}
        //this.mousePos = newMousePos;
        this.beginPos = newBeginPos;
        //console.log(newMousePos,this.beginPos);
    }
    update() {

    }

    draw() {
        if (this.mousePos == null){
            return;
        }
        
        this.game.context.beginPath();
		this.game.context.strokeStyle = 'lime' ;
		this.game.context.lineWidth = 5;
		this.game.context.moveTo(this.beginPos.x, this.beginPos.y);
		this.game.context.lineTo(this.mousePos.x, this.mousePos.y);
		this.game.context.stroke();
        //console.log(begin_x, begin_y,this.mousePos.x, this.mousePos.y)
    }
}