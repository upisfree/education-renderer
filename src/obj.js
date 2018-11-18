function parseOBJ(raw) {
  let rows = raw
    .replace(/ +/gi, ' ') // пытаемся выжить
    .split('\n');

  let vertexes = rows
    .filter(v => v.indexOf('v ') === 0)
    .map((a) => {
      let b = a.split(' ');

      return {
        x: parseFloat(b[1]),
        y: parseFloat(b[2]),
        z: parseFloat(b[3])
      };
    });

  let textures = rows
    .filter(v => v.indexOf('vt ') === 0)
    .map((a) => {
      let b = a.split(' ');

      return {
        x: parseFloat(b[1]), // u
        y: parseFloat(b[2]), // v
        z: parseFloat(b[3])  // w
      };
    });

  let normals = rows
    .filter(v => v.indexOf('vn ') === 0)
    .map((a) => {
      let b = a.split(' ');

      return {
        x: parseFloat(b[1]),
        y: parseFloat(b[2]),
        z: parseFloat(b[3])
      };
    });

  let polygons = rows
    .filter(v => v.indexOf('f ') === 0)
    .map((d) => {
      let a = d.split(' ');

      let v = a
        .filter(v => v !== 'f')
        .map(v => parseInt(v.split('/')[0]))
        .filter(v => v)
        .map((v) => {
          // в obj номер вершины может быть отрицательным — нужно брать её с конца
          if (v > 0) {
            return vertexes[v - 1];
          } else if (v <= -1) {
            return vertexes[vertexes.length + v];
          }
        });

      let vt = a
        .filter(v => v !== 'f')
        .map(v => parseInt(v.split('/')[1]))
        .filter(v => v)
        .map((v) => {
          // в obj номер вершины может быть отрицательным — нужно брать её с конца
          if (v > 0) {
            return textures[v - 1];
          } else if (v <= -1) {
            return textures[textures.length + v];
          }
        });

      let vn = a
        .filter(v => v !== 'f')
        .map(v => parseInt(v.split('/')[2]))
        .filter(v => v)
        .map((v) => {
          // в obj номер вершины может быть отрицательным — нужно брать её с конца
          if (v > 0) {
            return normals[v - 1];
          } else if (v <= -1) {
            return normals[textures.length + v];
          }
        });

      return {
        v: v,
        vt: vt,
        vn: vn
      };
    });

  return polygons;
}
