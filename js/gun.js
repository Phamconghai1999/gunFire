class gun {
    constructor(game) {
        this.game = game;
        this.size= 50;
        this.x_pos = 50;
        this.y_pos = GAME_HEIGHT - BASE_LINE - this.size;
        this.v_side = 0;
        
        this.center_x = this.x_pos + this.size/2;
        this.center_y = this.y_pos + this.size/2;

        this.loadImg();
        this.isImgLoaded = false;
        this.rad = 1;
    }

    loadImg() {
        this.img = new Image;
        this.img.onload = ()=>{
            this.isImgLoaded = true;
        }
        this.img.src = './image/gun.png';
    }

    update() {
        this.center_x = this.x_pos + this.size/2;
        this.center_y = this.y_pos + this.size/2;
        this.rad = Math.atan(-this.game.arrow.tanAlpha) + Math.PI/4;
        //console.log(this.rad);
    }

    draw() {
        //this.game.context.beginPath();
		//this.game.context.fillStyle = "#ff0101";
		//this.game.context.fillRect(this.x_pos,this.y_pos,this.size,this.size);
        if (! this.isImgLoaded) {
            return;
        }
        this.game.context.save();
        this.game.context.translate(this.x_pos + this.size/2,  this.y_pos + 37 );
        this.game.context.rotate(this.rad);
        this.game.context.drawImage(this.img, -this.size/2, -37);
        this.game.context.restore();
    }
   
}
