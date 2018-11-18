function onresize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

window.addEventListener('resize', onresize);
onresize();

var screenBuffer = context.createImageData(canvas.width, canvas.height);
var textureBuffer;
var parsedModel;
var zBuffer = new Float32Array(screenBuffer.width * screenBuffer.height);
zBuffer.fill(CONFIG.Z_NEAR);

function render() {
  context.putImageData(screenBuffer, 0, 0);

  requestAnimationFrame(render);
}

function putPixel(v, c) {
  let i = (v.y * canvas.width + v.x) * 4;

  screenBuffer.data[i]     = c.r;
  screenBuffer.data[i + 1] = c.g;
  screenBuffer.data[i + 2] = c.b;
  screenBuffer.data[i + 3] = c.a;
}

let m0 = new Matrix(2, 2,
  [[1, 0],
   [0, 1]]
);

let m1 = new Matrix(2, 1,
  [[0.5,
    0.5]]
);

// console.log(m0.multiplyOnMatrix(m1));

loadModel((raw) => {
  loadImage((img) => {
    textureBuffer = getRawTexture(img);
    parsedModel = parseOBJ(raw);

    // drawBlackBackground();

    // line(0, 10, 500, 400);

    drawFullModel();
    // drawZBuffer();

    render();
  });
});