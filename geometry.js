class Vector {
  constructor(x, y) {
    this.x = x || 0,
    this.y = y || 0;
  }
}

class Vertex {
  constructor(x, y, color, set) {
    this.pos   = new Vector(x, y);
    this.color = color;
    set.push(this);
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color || "#3C4043";
    ctx.arc(this.pos.x, this.pos.y, 7, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

class Constraint {
  constructor(v0, v1, set) {
    this.v0 = v0;
    this.v1 = v1;
    var dx = this.v1.pos.x - this.v0.pos.x,
        dy = this.v1.pos.y - this.v0.pos.y;
    this.dist = Math.sqrt(dx * dx + dy * dy);
    set.push(this);
  }

  render() {
    ctx.beginPath();
    //"#3C4043"
    ctx.strokeStyle = "#BDC1C6";
    ctx.moveTo(this.v0.pos.x, this.v0.pos.y);
    ctx.lineTo(this.v1.pos.x, this.v1.pos.y);
    ctx.closePath();
    ctx.stroke();
  }
}
