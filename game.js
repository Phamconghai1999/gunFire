

class game {
    constructor() {
        this.game_width = GAME_WIDTH;
        this.game_height = GAME_HEIGHT;
        this.canvas = null;
        this.context = null;
        this.mouseState = null;
        this.gunState = null;
        this.init();
        this.loop();
    }

    init() {
        //create canvas
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        document.body.appendChild(this.canvas);
        //create bg, gun, arrow
        this.background = new background(this);
        this.gun = new gun(this);
        this.arrow = new arrow(this);
        this.bullet = new bullet(this);
        this.target = new target(this);
        //listen event
        this.listenMouseEvt();
        this.mouse_posX = null;
        this.mouse_posY = null;

    }

    listenMouseEvt(){
        this.canvas.addEventListener('mousemove', (event) => {
            let mousePos = this.getMousePosition(event);
            let beginPos = {
                x: this.gun.center_x,
                y: this.gun.center_y
            }
            this.arrow.setMousePos(mousePos,beginPos);
            this.mouseState = 'move';
            //console.log(this.gunState);
        });
        this.canvas.addEventListener('mouseup', (event) => {
            let mousePos = this.getMousePosition(event);
            let GunPos = {
                x: this.gun.center_x,
                y: this.gun.center_y
            }
            this.gunState = 'fire';
            //this.target.setRandomPosition();
            //this.target.targetDestroyed();
            this.bullet.fire(mousePos,GunPos);
            console.log(mousePos);
        });
        this.canvas.addEventListener('click', (event) => {
            //this.gunState = 'fire';
            //console.log(this.gunState);
        });
        //===Keyboard
        this.canvas.addEventListener('mousedown', (event) => {
            this.mouseState = 'down';
            //console.log(this.mouseState);
        });
        document.addEventListener('keydown', (event)=> {
            let mousePos = this.getMousePosition(event);
            let beginPos = {
                x: this.gun.center_x,
                y: this.gun.center_y
            }
            this.arrow.setMousePos(mousePos,beginPos);
            if (event.key == "a") {
                this.gun.v_side ++;
                this.gun.x_pos -= this.gun.v_side;
                if (this.gun.x_pos <= 20) this.gun.x_pos = 20;//set
            }
            else if (event.key == "d"){
                this.gun.v_side ++;
                this.gun.x_pos += this.gun.v_side;
                if (this.gun.x_pos >= 250) this.gun.x_pos = 250;//set
            }
            //console.log(this.gun.center_x,this.gun.center_y);
        });
        document.addEventListener('keyup', (event)=> {
            this.gun.v_side = 0;
            //this.target.resetTarget();
        });
    }

    getMousePosition(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }


    loop() {
        this.update();
        this.draw();
        setTimeout( ()=> this.loop(),20);
    }

    update() {
        this.bullet.update();
        this.target.update();
        this.gun.update();
        this.background.update();
        //console.log(this.gunState);
    }

    draw() {
        this.clearScr();
        this.background.draw();
        this.bullet.draw();
        //this.arrow.draw();
        this.gun.draw();
        this.target.draw();
    }

    clearScr() {
		this.context.clearRect(0,0, this.game_width, this.game_height);
    }
}

var g = new game();