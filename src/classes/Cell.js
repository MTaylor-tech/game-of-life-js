class Cell {
  constructor (world, row=0, column=0, alive=false) {
    this.world = world;
    this.row = row;
    this.column = column;
    this.alive = alive;
    this.next_round_alive = alive;
    this.neighbors = [];
  }

  show() {
    if (this.alive) {
      return 'X';
    } else {
      return 'O';
    }
  }

  set_neighbors() {
    if (this.row > 0) { // not in top row, so has neighbors on top
      this.neighbors.push(this.world.get_cell(this.row-1,this.column))
      if (this.column > 0) {
        this.neighbors.push(this.world.get_cell(this.row-1,this.column-1))
      }
      if (this.column < this.world.width-1) {
        this.neighbors.push(this.world.get_cell(this.row-1,this.column+1))
      }
    }
    if (this.row < this.world.height-1) { // not in bottom row
      this.neighbors.push(this.world.get_cell(this.row+1,this.column))
      if (this.column > 0) {
        this.neighbors.push(this.world.get_cell(this.row+1,this.column-1))
      }
      if (this.column < this.world.width-1) {
        this.neighbors.push(this.world.get_cell(this.row+1,this.column+1))
      }
    }
    if (this.column > 0) { // not in left-most column
      this.neighbors.push(this.world.get_cell(this.row,this.column-1))
    }
    if (this.column < this.world.width-1) {
      this.neighbors.push(this.world.get_cell(this.row,this.column+1))
    }
  }

  prepare() {
    let count = 0;
    for (let i=0; i<this.neighbors.length; i++) {
      if (this.neighbors[i].alive) {
        count++;
      }
    }
    if (this.alive) {
      if ((count >= 4)||(count < 2)) {
        this.next_round_alive = false;
      }
    } else {
      if (count===3) {
        this.next_round_alive = true;
      }
    }
  }

  update() {
    this.alive = this.next_round_alive;
  }

  flip() {
    this.alive = !this.alive;
    this.next_round_alive = this.alive;
  }
}


class World {
  constructor(height=25, width=25) {
    this.height = height;
    this.width = width;
    this.cells = [];
    this.generation = 0;
    this.fill();
  }

  fill() {
    for (let h=0;h<this.height;h++) {
      let row = [];
      for (let w=0;w<this.width;w++) {
        row.push(new Cell(this,h,w));
      }
      this.cells.push(row);
    }
    for (let r=0;r<this.height;r++) {
      for (let c=0;c<this.width;c++) {
        this.cells[r][c].set_neighbors();
      }
    }
  }

  resize(height,width) {
    this.cells = [];
    this.height = height;
    this.width = width;
    this.generation = 0;
    this.fill();
  }

  get_cell(row,col) {
    return this.cells[row][col];
  }

  show() {
    let graph_string = '';
    for (let r=0;r<this.height;r++) {
      let row_string = '';
      for (let c=0;c<this.width;c++) {
        row_string += this.cells[r][c].show();
      }
      graph_string += row_string + '\n';
    }
    graph_string += `${this.generation}`;
    console.log(graph_string);
    return graph_string;
  }

  prepare() {
    for (let r=0;r<this.height;r++) {
      for (let c=0;c<this.width;c++) {
        this.cells[r][c].prepare();
      }
    }
  }

  update() {
    for (let r=0;r<this.height;r++) {
      for (let c=0;c<this.width;c++) {
        this.cells[r][c].update();
      }
    }
    this.generation++;
  }

  run(num_rounds=1) {
    this.show();
    for (let i=0;i<num_rounds;i++) {
      this.prepare();
      this.update();
      this.show();
    }
  }

  reset() {
    this.generation = 0;
    for (let r=0;r<this.height;r++) {
      for (let c=0;c<this.width;c++) {
        this.cells[r][c].alive = false;
        this.cells[r][c].next_round_alive = false;
      }
    }
  }

  randomize() {
    this.reset();
    for (let r=0;r<this.height;r++) {
      for (let c=0;c<this.width;c++) {
        if (Math.random() >= 0.5) {
          this.cells[r][c].flip();
          console.log(`Cell ${r},${c} is alive.`)
        }
      }
    }
  }

  flip(row,col) {
    this.cells[row][col].flip();
  }
}

export {Cell, World};

//     def randomize(self):
//         for h in range(self.height):
//             for w in range(self.width):
//                 r = random.randint(0,1)
//                 if r:
//                     self.cells[h][w].flip()
//
//     def living_cells(self):
//         cells = []
//         for h in range(self.height):
//             for w in range(self.width):
//                 if self.cells[h][w].alive:
//                     cells.append(self.cells[h][w])
//         return cells
//
//     def coordinates(self):
//         x = []
//         y = []
//         for c in self.living_cells():
//             (h, w) = c.position
//             x.append(w)
//             y.append(h)
//         return (x,y)
//
//     def graph(self):
//         (x,y) = self.coordinates()
//
//
//
//
// new_world = World(height=10, width=25)
//
// new_world.cells[0][1].flip()
// new_world.cells[1][2].flip()
// new_world.cells[2][0].flip()
// new_world.cells[2][1].flip()
// new_world.cells[2][2].flip()
// new_world.randomize()
//
// new_world.run(10)
