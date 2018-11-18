function drawFullModel() {
  let polygons = parsedModel;
  let lightDirection = { x: 0, y: 0, z: -1 };

  for (let i = 0; i < polygons.length; i++) {
    let wc = polygons[i].v;
    let sc = wc.map(a => Vector3.ToScreen(a));

    let color = polygons[i].vt;
    let normals = polygons[i].vn;

    triangle(
      sc[0], sc[1], sc[2],
      color[0], color[1], color[2],
      normals[0], normals[1], normals[2]
    );

    // это ускорение вычислений: мы не считаем треугольники с отрицательной освещённостью.
    // а так нам нужно высчитывать барицентрические координаты даже для таких треугольников
    // let firstEdge = Vector3.Subtract(wc[2], wc[0]);
    // let secondEdge = Vector3.Subtract(wc[1], wc[0]);

    // let normal = Vector3.Normalize(Vector3.Multiply(firstEdge, secondEdge));
    // let lightIntensity = Vector3.MultiplyVectorsGetScalar(normal, lightDirection);

    // if (lightIntensity > 0) {
    //   triangle(
    //     sc[0], sc[1], sc[2],
    //     color[0], color[1], color[2],
    //     normals[0], normals[1], normals[2]
    //   );
    // }
  }
}

// инвертированный z-buffer
function drawZBuffer() {
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let c = zBuffer[x + y * canvas.width];

      if (c === CONFIG.Z_NEAR) {
        c = 0;
      } else {
        c = 1 - c;
      }

      putPixel({ x: x, y: y }, { r: c * 255, g: c * 255, b: c * 255, a: 255 });
    }
  }
}

function getPixelFromTextureBuffer(x, y) {
  let i = ((y * (textureBuffer.width * 4)) + (x * 4));

  return {
    r: textureBuffer.data[i],
    g: textureBuffer.data[i + 1],
    b: textureBuffer.data[i + 2],
    a: textureBuffer.data[i + 3]
  };
}

function drawRawTexture(texture) {
  let t = getRawTexture(texture);

  for (let x = 0; x < t.width; x++) {
    for (let y = 0; y < t.height; y++) {
      let i = ((y * (t.width * 4)) + (x * 4));

      let r = t.data[i];
      let g = t.data[i + 1];
      let b = t.data[i + 2];
      let a = t.data[i + 3];

      putPixel({ x: x, y: y }, { r: r, g: g, b: b, a: a });
    }
  }
}

function getRawTexture(texture) {
  let _canvas = document.createElement('canvas');

  // хром не грузит иначе в память всю текстуру
  _canvas.width = texture.width;
  _canvas.height = texture.height;

  let _context = _canvas.getContext('2d');
  let _buffer = context.createImageData(texture.width, texture.height);

  _context.drawImage(texture, 0, 0);

  // document.body.appendChild(_canvas); // только для дебага

  return _context.getImageData(0, 0, texture.width, texture.height);
}