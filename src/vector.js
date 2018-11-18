const Vector3 = {
  ToScreen: function(a) {
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    return {
      x: cx + a.x * CONFIG.MODEL_SCALE,
      y: cy - a.y * CONFIG.MODEL_SCALE,
      z: (a.z - CONFIG.Z_NEAR) / (CONFIG.Z_FAR - CONFIG.Z_NEAR)
    };
  },
  Add: function(...v) { // через reduce, чтобы складывать любое кол-во векторов
    return {
      x: v.reduce((a, b) => a + b.x, 0), // почему вторым аргументом 0: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Sum_of_values_in_an_object_array
      y: v.reduce((a, b) => a + b.y, 0),
      z: v.reduce((a, b) => a + b.z, 0)
    }
  },
  Subtract: function(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z
    }
  },
  Multiply: function(a, b) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    }
  },
  Length: function(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  },
  Swap: function(a, b) {
    return {
      a: b,
      b: a
    };
  },
  Normalize: function(v) {
    let l = Vector3.Length(v);

    return {
      x: v.x / l,
      y: v.y / l,
      z: v.z / l
    }
  },
  MultiplyVectorsGetScalar: function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  },
  MultiplyOnScalar: function(v, a) {
    return {
      x: v.x * a,
      y: v.y * a,
      z: v.z * a
    }
  }
}