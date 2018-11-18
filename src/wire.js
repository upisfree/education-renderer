function drawWireModel(raw) {
  let polygons = parseModel(raw);

  for (let i = 0; i < polygons.length; i++) {
    let t = polygons[i];

    for (let j = 0; j < t.length; j++) {
      let t1 = t[j];
      let t2 = t[j + 1];

      if (!t2) {
        t2 = t[0];
      }

      drawLine(
        Vector3.ToScreen(t1),
        Vector3.ToScreen(t2),
        '#000'
      );
    }
  }
}
