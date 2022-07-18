Rock.count = 0;
Rock.all = {};
Rock.data = [
    {r: 0.025, speed: 0.0005, min_angle: 60, max_angle: 90},
    {r: 0.08, speed: 0.00025, min_angle: 50, max_angle: 70},
    {r: 0.2, speed: 0.00006, min_angle: 30, max_angle: 45}
];

function Rock(size, x, y) {
    Rock.count++;
    this.id = Rock.count;
    Rock.all[this.id] = this;
    //
    this.size = size!==undefined ? size : 2;
    // 
    this.r = Rock.data[this.size].r;
    this.points = [];
    this.x = x!=undefined ? x : (VAR.rand(0,1) ? VAR.rand(0,3) : VAR.rand(7,10)/10)*VAR.W;
    this.y = y!=undefined ? y : (VAR.rand(0,1) ? VAR.rand(0,3) : VAR.rand(7,10)/10)*VAR.H;
    //
    this.modX = Rock.data[this.size].speed*VAR.rand(1,10)*(VAR.rand(0,1) ? 1 : -1);
    // this.modX = 0.0002*VAR.rand(1,10)*(VAR.rand(0,1) ? 1 : -1);
    this.modY = Rock.data[this.size].speed*VAR.rand(1,10)*(VAR.rand(0,1) ? 1 : -1);
    //
    // this.r = 0.2;
    
    let a = 0;
    while(a<360) {
        // a+=VAR.rand(30,45);
        a+=VAR.rand(Rock.data[this.size].min_angle,Rock.data[this.size].max_angle);
        this.points.push({
            y : Math.sin(Math.PI/180*a)*this.r,
            x : Math.cos(Math.PI/180*a)*this.r
        });
    }
}
Rock.prototype.hitTest = function(x,y) {
    if (x>this.x - this.r*VAR.D && x<this.x + this.r*VAR.D && y>this.y - this.r*VAR.D && y<this.y + this.r*VAR.D) {
        if (Game.hit_ctx.getImageData(x,y,1,1).data[0]==255) {
            return true;
        }
    }
    return false;
}
Rock.prototype.remove = function() {
    if (this.size>0) {
        for (let i=0, j=VAR.rand(2,4); i<j; i++) {
            new Rock(this.size-1, this.x, this.y);
        }
    }
    delete Rock.all[this.id]
}
Rock.prototype.draw = function() {
    this.x += this.modX*VAR.D;
    this.y += this.modY*VAR.D;

    if (this.x + this.r*VAR.D<0) {
        this.x += VAR.W+(this.r*2*VAR.D)
    } else if (this.x - this.r*VAR.D>VAR.W) {
        this.x-= VAR.W+(this.r*2*VAR.D)
    }
    if (this.y + this.r*VAR.D<0) {
        this.y += VAR.H+(this.r*2*VAR.D)
    } else if (this.y - this.r*VAR.D>VAR.H) {
        this.y-= VAR.H+(this.r*2*VAR.D)
    }

    
    Game.ctx.beginPath();
    Game.hit_ctx.beginPath();
    for(let i=0; i<this.points.length; i++) {
        Game.hit_ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.D+this.x, this.points[i].y*VAR.D+this.y);
        Game.ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.D+this.x, this.points[i].y*VAR.D+this.y);
    }
    Game.hit_ctx.closePath();
    Game.hit_ctx.fill();
    Game.ctx.closePath();
    Game.ctx.stroke();
};

Rock.draw = function() {
    Rock.num = 0;
    for(let r in Rock.all){
        Rock.num++;
        Rock.all[r].draw();
    }
}