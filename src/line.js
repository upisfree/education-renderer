// draws a line using Bresenham's line algorithm (integer version)
function line(x0, y0, x1, y1) {
  // convert all coordinates to integers
  x0 |= 0;
  y0 |= 0;
  x1 |= 0;
  y1 |= 0;

  // get binary pixel data array
  var data = screenBuffer.data;

  var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);

  if (steep) {
    var tmp;
    tmp = x0;
    x0 = y0;
    y0 = tmp;

    tmp = x1;
    x1 = y1;
    y1 = tmp;
  }
  
  var yStep;
  
  if (x0 > x1) {
    var tmp;

    tmp = x0;
    x0 = x1;
    x1 = tmp;

    tmp = y0;
    y0 = y1;
    y1 = tmp;
  }
  
  if (y0 < y1) {
    yStep = 1;
  } else {
    yStep = -1;
  }
  
  var deltaX = x1 - x0;
  var deltaY = Math.abs(y1 - y0);
  var error = 0;
  
  var y = y0;
  for (var x = x0; x <= x1; x++) {    
    putPixel({ x: x, y: y }, COLOR.BLACK);

    error += deltaY;

    if ((error << 1) >= deltaX) {
      y += yStep;
      error -= deltaX;
    }
  }
}
