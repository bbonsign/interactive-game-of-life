// helper function: modulus but with nonnegative return value
function mod(n, m) {
  return ((n % m) + m) % m;
}


export class GameOfLife {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array(this.size).fill(false);
  }

  get size() {
    return this.width * this.height;
  }

  indexOf({row, column}) {
    return row * this.width + column;
  }

  coorsOf(index) {
    return {
      row: Math.floor(index / this.width),
      column: index % this.width
    }
  }

  setCell(coors, bool) {
    // bool: true for alive, false for dead
    let idx = this.indexOf(coors);
    this.cells[idx] = bool;
  }

  toggleCell(coors) {
    let idx = this.indexOf(coors);
    this.cells[idx] = !this.cells[idx];
  }

  clear() {
    this.cells = this.cells.map(() => false);
  }

  liveNeighborCount({row, column}) {
    let count = 0;
    for (let delta_row of [this.height - 1, 0, 1]) {
      for (let delta_col of [this.width - 1, 0, 1]) {
        if (delta_row === 0 && delta_col === 0) {
          continue;
        }

        let neighbor_row = mod(row + delta_row, this.height);
        let neighbor_col = mod(column + delta_col, this.width);
        let idx = this.indexOf({row: neighbor_row, column: neighbor_col});
        count += this.cells[idx] ? 1 : 0;
      }
    }
    return count
  }

  tick() {
    let next = [];

    for (let i = 0; i < this.size; i++) {
      let coors = this.coorsOf(i)
      let neighborCount = this.liveNeighborCount(coors);

      if (this.cells[i] && ![2, 3].includes(neighborCount)) {
        // a live cell w/out 2 or 3 neighbors dies
        next.push(false);
        // this.setCell(coors, false);
      }
      else if (!this.cells[i] && neighborCount === 3) {
        // a dead cell w/ 3 neighbors comes alive
        // this.setCell(coors, true);
        next.push(true);
      }
      else {
        next.push(this.cells[i])
      }
    }
    this.cells = next;
  }
}

