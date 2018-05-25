
window.addEventListener("load", function() {
  canvas = new Canvas(1920, 1080);
  ctx = canvas.ctx;

  // console.log(canvas.width, canvas.res.x)
  x = 0;
  y = 0;
  offsetx = 0;
  offsety = 0;
  dox = 0;
  doy = 0;
  oox = 0;
  ooy = 0;
  z = 100;
  isDraged = false;

  image = new Image();
  image.src = 'a.jpg';
  // image.onload = function() {
    // ctx.drawImage(image, 0, 0);
    // console.log(this.width, image.width)
  // }
  // console.log(image.naturalWidth, image.width)
  step();

  window.addEventListener('mousemove', move);
  window.addEventListener('mousedown', down);
  window.addEventListener('mouseup', up);
  window.addEventListener('wheel', zoom);
});

function step() {

  canvas.clear();
  var p = z / 100;
  var px = p * offsetx + (canvas.res.x - p * canvas.res.x) / 2;
  var py = p * offsety + (canvas.res.y - p * canvas.res.y) / 2;
  // console.log(offsetx, offsety, px, py)
  ctx.setTransform(p, 0, 0, p, px, py);
  // ctx.fillStyle = '#ff0';
  // ctx.fillRect(0, 0, canvas.res.x, canvas.res.y);
  ctx.drawImage(image, 600, 0, 720, 1080);

  window.requestAnimationFrame(step);
}

function down() {
  isDraged = true;
  // dox = event.pageX;
  // doy = event.pageY;
  oox = offsetx;
  ooy = offsety;
  dox = getX();
  doy = getY();
  addEventListener('mousemove', drag);
}

function move() {
  // console.log('dupa', event.pageX, event.clientX)
  // console.log(offsetx, offsety)
}

function getX() {
  return canvas.res.x * (event.clientX - canvas.offset.x) / canvas.width;
}

function getY() {
  return canvas.res.y * (event.clientY - canvas.offset.y) / canvas.height;
}

function drag() {
  // console.log('drag')
  var p = z / 100;
  // offsetx = p * (oox + (event.pageX - dox));
  // offsety = p * (ooy + (event.pageY - doy));
  offsetx = oox + (1 / p) * (getX() - dox);
  offsety = ooy + (1 / p) * (getY() - doy);
  console.log(offsetx, offsety, event.pageX - dox, event.pageY - doy)
}

function up() {
  isDraged = false;
  removeEventListener('mousemove', drag);
}

function zoom() {

  z += event.deltaY > 0 ? -20 : 20;
  console.log(event.deltaY, z)
}
