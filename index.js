window.onload = function() {
    Game.init();
}

let a = 0;
let b = 0;


VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,
    lastUpdate: -1,
    rand: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

Game = {
    init: function() {
        Game.scoreBox = document.createElement('div');
        Game.canvas = document.createElement('canvas');
        Game.hit_canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.hit_ctx = Game.hit_canvas.getContext('2d');
        // document.body.appendChild(Game.hit_canvas);
        document.body.appendChild(Game.canvas);
        document.body.appendChild(Game.scoreBox);
        Game.scoreBox.classList.add('score-box');
        Game.scoreBox.innerText = `Score: ${score.value}`;
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
    stop: function() {
        window.removeEventListener('keydown', Game.onKey, false);
        window.removeEventListener('keyup', Game.onKey, false);
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
                    // score++;
                    // Game.scoreBox.innerText = `Score: ${score}`;
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
        Game.hit_canvas.width = VAR.W;
        Game.hit_canvas.height = VAR.H;
        //
        Game.ctx.fillStyle = 'black';
        Game.ctx.strokeStyle = 'black';
        Game.ctx.lineWidth = 1;
        Game.ctx.lineJoin = 'round';
        Game.hit_ctx.fillStyle = 'red';

    },
    animationLoop: function(time) {
        requestAnimationFrame(Game.animationLoop);
        if (time-VAR.lastTime>=1000/VAR.fps) {
            VAR.lastTime = time;
            Game.ctx.clearRect(0,0,VAR.W, VAR.H);
            Game.hit_ctx.clearRect(0,0,VAR.W, VAR.H);
            
            Rock.draw();
            Bullet.draw();
            Game.ship.draw();
            Dot.draw();
        }
        
    }
}

