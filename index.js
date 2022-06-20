window.onload = function() {
    Game.init();
}



VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,
    lastUpdate: -1,
    toRadians: Math.PI/180,
    rand: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
        drawImage: function(image, x, y, angle) {
        context.save(); 
        context.translate(x, y);
        context.rotate(angle * TO_RADIANS);
        context.drawImage(image, -(image.width/2), -(image.height/2));
        context.restore(); 
    }
}

Game = {
    init: function() {
        Game.canvas = document.createElement('canvas');
        Game.imageCanvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.imageCtx = Game.imageCanvas.getContext('2d');
        document.body.appendChild(Game.canvas);
        document.body.appendChild(Game.imageCanvas);
        let shipImg = new Image();
        shipImg.onload = showImg;
        shipImg.src = 'ship.png';
        function showImg() {
            // Game.imageCtx.drawImage(shipImg, 100, 100);
        }
        Game.layout();
        
        //
        window.addEventListener('resize', Game.layout);
        for(let i=0; i<4; i++) {
            new Rock();
        }
        Game.ship = new Ship();
        //
        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);
        Game.animationLoop();
    },
    onKey: function(ev) {
        if (ev.keyCode==32 || ev.keyCode==37 || ev.keyCode==38 || ev.keyCode==39) {
            ev.preventDefault();
            if (ev.type=='keydown' && !Game['key_'+ev.keyCode]) {
                Game['key_'+ev.keyCode] = true;
                if (ev.keyCode == 37) {
                    Game.key_39 = false;
                } else if (ev.keyCode == 39) {
                    Game.key_37 = false;
                } else if (ev.keyCode == 32) {
                    new Bullet();
                } 
            }
            if (ev.type == 'keyup') {
                Game['key_'+ev.keyCode] = false;
            }
        }
    },
    layout: function(ev) {
        VAR.W = window.innerWidth;
        VAR.H = window.innerHeight;
        VAR.D = Math.min(VAR.W, VAR.H);
        //
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;
        Game.imageCanvas.width = VAR.W;
        Game.imageCanvas.height = VAR.H;
        //
        Game.ctx.fillStyle = 'black';
        Game.ctx.strokeStyle = 'black';
        Game.ctx.lineWidth = 1;
        Game.ctx.lineJoin = 'round';

    },
    animationLoop: function(time) {
        requestAnimationFrame(Game.animationLoop);
        if (time-VAR.lastTime>=1000/VAR.fps) {
            VAR.lastTime = time;
            Game.ctx.clearRect(0,0,VAR.W, VAR.H);
            Game.ship.draw();
            Bullet.draw();
            Rock.draw();
        }
        
    }
}

