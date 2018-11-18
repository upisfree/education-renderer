function generateNoise() {
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let c = 255 * Math.random();

      putPixel(
        { x: x, y: y },
        { r: c, g: c, b: c, a: c }
      );
    }
  }
}

function drawBlackBackground() {
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let c = 0;

      putPixel(
        { x: x, y: y },
        { r: c, g: c, b: c, a: 255 }
      );
    }
  }
}