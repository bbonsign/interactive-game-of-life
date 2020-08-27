// helper function: modulus but with nonnegative return value
function mod(n, m) {
  return ((n % m) + m) % m;
}


export class GameOfLife {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array(this.size).fill(true);
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

  liveNeighborCount({row, column}) {
    let count = 0;
    for (let delta_row of [self.height - 1, 0, 1]) {
      for (let delta_col of [self.width - 1, 0, 1]) {
        if (delta_row === 0 && delta_col === 0) {
          continue;
        }

        let neighbor_row = mod(row + delta_row, self.height);
        let neighbor_col = mod(column + delta_col, self.width);
        let idx = self.get_index({row: neighbor_row, column: neighbor_col});
        count += self.cells[idx] ? 1 : 0;
      }
    }
    return count
  }

  tick() {
    for (let i = 0; i < this.size; i++) {
      let coors = this.coorsOf(i)
      let neighborCount = this.liveNeighborCount(coors);

      if (this.cells[i] && ![2, 3].includes(neighborCount)) {
        // a live cell w/out 2 or 3 neighbors dies
        this.setCell(coors, false);
      }
      else if (!this.cells[i] && neighborCount === 3) {
        // a dead cell w/ 3 neighbors comes alive
        this.setCell(coors, true);
      }
    }
  }
}
