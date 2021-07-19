class bullet {
    constructor(game) {
        this.game = game;
        this.BulletTanAlpha = null;
        this.size = 10;
        this.startBulletProperties();
    }
    startBulletProperties() {
        this.BulletPos = {
            x: this.game.gun.center_x,
            y: this.game.gun.center_y
        };
        this.BulletSpeed = 25;
        this.speed = {
            x: null,
            y: null
        };
    }
    fire(mousePos, gunPos) { //update TanAlpha of Bullet
        this.BulletTanAlpha = (gunPos.y - mousePos.y)/(mousePos.x -gunPos.x);
        let Force = Math.sqrt(((gunPos.y - mousePos.y)*(gunPos.y - mousePos.y) + (mousePos.x -gunPos.x)*(mousePos.x -gunPos.x)));
        if (Force >= 400) Force = 400;
        this.BulletSpeed = Force / 14;
        this.speed = {
            x: this.BulletSpeed * Math.cos(Math.atan((this.BulletTanAlpha))),
            y: this.BulletSpeed * Math.sin(Math.atan((this.BulletTanAlpha)))
        }
        this.BulletPos = gunPos;
        
        //console.log(this.speed,this.BulletTanAlpha,Force);
    }

    checkTargetBursted() {
        //console.log(this.game.target.x_pos, this.game.target.y_pos);
        //console.log(this.BulletPos);
        if (((this.BulletPos.x >= this.game.target.x_pos) && (this.BulletPos.x <= this.game.target.x_pos + 40) && ((this.BulletPos.y >= this.game.target.y_pos)&&(this.BulletPos.y <= this.game.target.y_pos+this.game.target.height))) 
            ){
            this.game.target.targetDestroyed(); 
        }
        //console.log(this.game.target.isTargetBursted);
    }

    update() {
        
        if (this.game.gunState === 'fire'){
            // calculate speed 
            this.speed.x += WIND;
            this.BulletPos.x += this.speed.x;
            this.speed.y -= GRAVITY;
            this.BulletPos.y -= this.speed.y;
            //console.log(this.BulletPos,this.speed);

            //check bullet pos vs baseLine
            if (this.BulletPos.y > GAME_HEIGHT - BASE_LINE ||  this.BulletPos.x < 0 || this.BulletPos.x > GAME_WIDTH || this.game.target.isTargetBursted) {
                this.game.gunState = 'stop';
                this.startBulletProperties();
            }
        }
        else {
            this.speed = {
                x: this.BulletSpeed * Math.cos(Math.atan((this.BulletTanAlpha))),
                y: this.BulletSpeed * Math.sin(Math.atan((this.BulletTanAlpha)))
            }
            
        }
        this.checkTargetBursted() ;
        //if (this.game.target.isTargetBursted)
    }

    draw() {
        if (this.game.gunState === 'fire') {
            this.game.context.beginPath();
            this.game.context.fillStyle = 'lime';
            this.game.context.arc(this.BulletPos.x,this.BulletPos.y,this.size,0,2*Math.PI);
            this.game.context.fill();
        }
    }

}