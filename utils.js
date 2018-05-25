
class Canvas {
  constructor(x, y) {
    this.res    = new Vector(x, y);
    this.offset = new Vector();
    this.width  = 0;
    this.height = 0;
    this.elem   = document.createElement("canvas");
    this.ctx    = this.elem.getContext("2d");
    document.body.appendChild(this.elem);
    this.resize();
    window.addEventListener("resize", () => this.resize() );
  }

  clear() {
    this.ctx.clearRect(-50 * canvas.res.x, -50 * canvas.res.y, 100 * canvas.res.x, 100 * canvas.res.y);
  }

  resize() {
    this.elem.width  = this.res.x;
    this.elem.height = this.res.y;
    this.width       = this.elem.offsetWidth;
    this.height      = this.elem.offsetHeight;
    this.offset.x    = this.elem.offsetLeft;
    this.offset.y    = this.elem.offsetTop;
  }
}

class Pointer {
  constructor(canvas, vertices) {
    this.pos      = new Vector();
    this.offset   = new Vector();
    this.target   = null;
    this.vertices = vertices;
    this.canvas   = canvas;
    this.canvas.elem.addEventListener("mousedown", () => this.down() );
    window.addEventListener("mouseup", () => this.up() );
    window.addEventListener("mousemove", (event) => this.move(event) );
  }

  move(event) {
    this.pos.x = this.canvas.res.x * (event.clientX - this.canvas.offset.x) / this.canvas.width;
    this.pos.y = this.canvas.res.y * (event.clientY - this.canvas.offset.y) / this.canvas.height;
    if (this.target) {
      this.target.pos.x = this.pos.x - this.offset.x;
      this.target.pos.y = this.pos.y - this.offset.y;
    }
  }

  down() {
    var v, t, dx, dy, dist, min = 20;
    for (var i = 0; i < this.vertices.length; i++) {
      v = this.vertices[i];
      dx = this.pos.x - v.pos.x;
      dy = this.pos.y - v.pos.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < min) min = dist, t = v;
    }
    if (t) {
      this.target = t;
      this.offset.x = this.pos.x - this.target.pos.x;
      this.offset.y = this.pos.y - this.target.pos.y;
    }
  }

  up() {
    this.target = null;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#AEEA00";
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.target.pos.x, this.target.pos.y);
    ctx.closePath();
    ctx.stroke();
  }
}
