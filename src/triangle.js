function barycentric(a, b, c, p) {
  let u0 = { x: c.x - a.x, y: b.x - a.x, z: a.x - p.x };
  let u1 = { x: c.y - a.y, y: b.y - a.y, z: a.y - p.y };

  let u = Vector3.Multiply(u0, u1);

  return (Math.abs(u.z) > 0.5) ? {
    x: 1 - (u.x + u.y) / u.z,
    y: u.y / u.z,
    z: u.x / u.z
  } : { x: -1, y: 1, z: 1 }; // dont forget that u.z is an integer. If it is zero then triangle ABC is degenerate
}

// v0, v1, v2
// ex: v -0.081696 0.734665 -0.623267
// uv0, uv1, uv2
// ex: vt  0.532 0.923 0.000
// n0, n1, n2
// ex: vn  0.136 0.595 0.792

function triangle(v0, v1, v2, uv0, uv1, uv2, n0, n1, n2) {
  var minX = Math.floor(Math.min(v0.x, v1.x, v2.x));
  var maxX = Math.ceil(Math.max(v0.x, v1.x, v2.x));
  var minY = Math.floor(Math.min(v0.y, v1.y, v2.y));
  var maxY = Math.ceil(Math.max(v0.y, v1.y, v2.y));

  var data = screenBuffer.data;
  var width = screenBuffer.width;

  // p is our 2D pixel location point
  var p = {};  
  
  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      // sample from the center of the pixel, not the top-left corner
      p.x = x + 0.5;
      p.y = y + 0.5;
      // p.x = x;
      // p.y = y;

      let c = barycentric(v0, v1, v2, p);

      // if the point is not inside our polygon, skip fragment
      if (c.x < 0 || c.y < 0 || c.z < 0) {
        continue; 
      }

      // интерполируем вершинные координаты в данном треугольнике,
      // чтобы получить правильный z-buffer (см. drawZBuffer())
      let vi = Vector3.Add(
        Vector3.MultiplyOnScalar(v0, c.x),
        Vector3.MultiplyOnScalar(v1, c.y),
        Vector3.MultiplyOnScalar(v2, c.z)
      );

      if (zBuffer[x + y * canvas.width] > vi.z) {
        zBuffer[x + y * canvas.width] = vi.z;

        // интерполируем текстурные координаты данной вершины в данном треугольнике
        let uv = Vector3.Add(
          Vector3.MultiplyOnScalar(uv0, c.x),
          Vector3.MultiplyOnScalar(uv1, c.y),
          Vector3.MultiplyOnScalar(uv2, c.z)
        );

        let color = getPixelFromTextureBuffer(
          Math.round((1 - uv.x) * textureBuffer.width),
          Math.round((1 - uv.y) * textureBuffer.height)
        );

        // тонировка Фонга
        // интерполируем нормальные вектора к вершинам в данном треугольнике
        let n = Vector3.Add(
          Vector3.MultiplyOnScalar(n0, c.x),
          Vector3.MultiplyOnScalar(n1, c.y),
          Vector3.MultiplyOnScalar(n2, c.z)
        );

        color.r *= n.z;
        color.g *= n.z;
        color.b *= n.z;

        // set pixel
        putPixel({ x: x, y: y }, color);
      }
    }
  }
}