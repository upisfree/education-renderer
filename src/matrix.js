// TODO:
// всё оптимизировать и сделать матрицы 3х3 и 4х4

class Matrix {
  constructor(r, c, elements) {
    this.elements = elements;
    this.rows = r;
    this.columns = c;
  }

  add(m) {
    if (this.rows === m.rows && this.columns === m.columns) { // скалдывать можно матрицы с одинаковыми размерами
      for (let i = 0; i < this.elements.length; i++) {
        for (let j = 0; j < this.elements[0].length; j++) {
          this.elements[i][j] += m.elements[i][j];
        }
      }
    } else {
      console.error('Matrix: you can\'t add matrix with different size');
    }

    return this;
  }

  multiplyOnScalar(s) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i] *= s;
    }

    return this;
  }

  multiplyOnMatrix(m) {
    if (this.columns === m.rows) {
      let result = new Matrix(new Array(this.rows * m.columns).fill(0));

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < m.columns; j++) {
          // result.elements[i][j] = 0.f;
          for (let k = 0; k < this.columns; k++) {
            result.elements[i][j] += this.elements[i][k] * m.elements[k][j];
          }
        }
      }



      // let result = new Matrix(this.rows, m.columns, new Array(this.rows * m.columns).fill(0));

      // for (let i = 0; i < this.rows; i++) {
      //   for (let j = 0; j < m.columns; j++) {
      //     for (let k = 0; k < this.columns; k++) {
      //       // result.elements[i * m.columns + j] += this.elements[i * this.columns + k] * m.elements[k * m.columns + j];
      //     }
      //   }
      // }

      // // console.log(result);

      this.columns = m.columns;
      this.elements = result.elements;
    } else {
      console.error('Matrix: you can\'t multiply matrix with different cols and rows size');
    }

    return this;
  }
}