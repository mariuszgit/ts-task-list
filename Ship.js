function Ship() {
    this.r = 0.04;
    this.rear_a = 50;
    this.a = 0;
    //
    this.x = VAR.W/2;
    this.y = VAR.H/2;
    //
    this.modX = 0;
    this.modY = 0;
    //
    this.acc = 0.0004;
    //
    this.maxMod = 0.014;
    //
    this.points = [{},{},{}];
}

Ship.prototype.draw = function() {
    if(Game.key_38) {
        this.modX = Math.max(-this.maxMod*VAR.D, Math.min(this.maxMod*VAR.D, this.modX+Math.sin(Math.PI/180*this.a)*this.acc*VAR.D));
        this.modY = Math.max(-this.maxMod*VAR.D, Math.min(this.maxMod*VAR.D, this.modY-Math.cos(Math.PI/180*this.a)*this.acc*VAR.D));
        // this.modY = this.modY-Math.cos(Math.PI/180*this.a)*this.acc*VAR.D;
    } else {
        this.modX = this.modX*0.95;
        this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX;
        this.modY = this.modY*0.95;
        this.modY = Math.abs(this.modY)<0.0001 ? 0 : this.modY;
    }

    if(Game.key_37 || Game.key_39) {
        this.a = this.a + 6*( Game.key_37 ? -1 : 1);
    }

    this.x += this.modX;
    this.y += this.modY;

    // Game.ctx.beginPath();
    // Game.ctx.lineWidth = 1;
    // Game.ctx.arc(this.x, this.y, 3, 0,Math.PI/180*360);
    // Game.ctx.arc(this.x, this.y, this.r*VAR.D, 0,Math.PI/180*360);
    // Game.ctx.closePath();
    // Game.ctx.stroke();

    Game.ctx.beginPath();
    for (i=0; i<3; i++) {
        this.tmp_a = i===0 ? this.a : (this.a+180+ (i==1 ? this.rear_a : -this.rear_a));
        this.tmp_r = i===0 ? this.r : this.r*0.75;
        Game.ctx.beginPath();
        this.points[i].x = Math.round(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.x);
        this.points[i].y = Math.round(-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.y);
        //
        Game.ctx.moveTo(this.points[0].x, this.points[0].y);
        Game.ctx.lineTo(this.points[1].x, this.points[1].y);
        Game.ctx.lineTo(this.points[2].x, this.points[2].y);

        // Game.ctx[ i===0 ? 'moveTo' : 'lineTo' ](this.points[i].x, this.points[i].y);
        //        
    }
    Game.ctx.closePath();
    Game.ctx.stroke();

    if (Game.key_38 && this.draw_thrust) {
        this.draw_thrust = false;
        Game.ctx.beginPath();
    for (i=0; i<3; i++) {
        this.tmp_a = i!=1 ? this.a+180+(i===0 ? -this.rear_a+14 : this.rear_a-14) : this.a+180;
        this.tmp_r = i===1 ? this.r : this.r*0.5;
        if (i==0) {
            Game.ctx.moveTo(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.x, -Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.y);
        } else {
            Game.ctx.lineTo(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.x, -Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.D+this.y);
        }
    }
    Game.ctx.stroke();
    } else if (Game.key_38 && !this.draw_thrust) {
        this.draw_thrust = true;
    }
    
    //behind screen
    if (this.points[0].x<0 && this.points[1].x<0 && this.points[2].x<0) {
        this.x = this.x + VAR.W - Math.min(this.points[0].x, this.points[1].x, this.points[2].x)*0.9;
    } else if (this.points[0].x>VAR.W && this.points[1].x>VAR.W && this.points[2].x>VAR.W) {
        this.x -= VAR.W - (VAR.W - Math.max(this.points[0].x, this.points[1].x, this.points[2].x))*0.9;
    }
    if (this.points[0].y<0 && this.points[1].y<0 && this.points[2].y<0) {
        this.y = this.y + VAR.H - Math.min(this.points[0].y, this.points[1].y, this.points[2].y)*0.9;
    } else if (this.points[0].y>VAR.H && this.points[1].y>VAR.H && this.points[2].y>VAR.H) {
        this.y -= VAR.H - (VAR.H - Math.max(this.points[0].y, this.points[1].y, this.points[2].y))*0.9;
    }

}