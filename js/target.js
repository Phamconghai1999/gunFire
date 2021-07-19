class target{
    constructor(game) {
        this.game = game;
        this.x_pos = null;
        this.y_pos = null;
        this.setTargetProperties();
        this.setRandomPosition();
        this.loadImg();
        this.isImgLoaded = false;
        this.isTargetBursted = false;
        this.timer = 0;
        this.refreshTarget = 100;
    }

    setTargetProperties() {
        if (this.isTargetBursted) {
            this.width = 100;
            this.height = 100;
        }
        else {
            this.width = 45;
            this.height = 30;
        }
        
    }

    setRandomPosition() {
        // 1/4 width=> width vs 0 => 3/4(height - baseline)
        this.x_pos = GAME_WIDTH *1/4 + Math.random() * GAME_WIDTH * 3/4 - this.width;
        this.y_pos = (GAME_HEIGHT - BASE_LINE)*Math.random()*3/4 - this.height;
        console.log(this.x_pos, this.y_pos);
    }

    targetDestroyed() {
        this.isTargetBursted = true;
        this.setTargetProperties();
        this.loadImg();
    }

    resetTarget() {
        this.isTargetBursted = false;
        this.setTargetProperties();
        this.setRandomPosition();
        this.loadImg();
    }

    loadImg() {
        this.img = new Image;
        this.img.onload = ()=>{
            this.isImgLoaded = true;
        }
        if (!this.isTargetBursted) {
            this.img.src = './image/pic1.png'; // ufo
        }
        else  {this.img.src = './image/pic2.png';} // bum
    }
    update() {
        if (this.isTargetBursted) {
            this.timer++;
            console.log(this.timer);
        }
        if (this.timer >= this.refreshTarget) {
            this.resetTarget();
            this.timer = 0;
        }
    }

    draw() {
        if (! this.isImgLoaded) {
            return;
        }
        //this.game.context.drawImage(this.img, this.x_pos, this.y_pos);
        this.game.context.save();
        this.game.context.translate(this.x_pos + this.width/2,  this.y_pos + this.height/2 );
        this.game.context.drawImage(this.img, -this.width/2, -this.height/2);
        this.game.context.restore();
    }
}